using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Reflection;
using System.Runtime.Serialization;
using System.Web.Http;
using System.Web.Http.Description;
using System.Xml.Serialization;

namespace LtePlatform.Areas.HelpPage.ModelDescriptions
{
    public static class ModelProviderFactory
    {
        // Modify this to add more default documentations.
        public static readonly IDictionary<Type, string> DefaultTypeDocumentation = new Dictionary<Type, string>
        {
            { typeof(short), "integer" },
            { typeof(int), "integer" },
            { typeof(long), "integer" },
            { typeof(ushort), "unsigned integer" },
            { typeof(uint), "unsigned integer" },
            { typeof(ulong), "unsigned integer" },
            { typeof(byte), "byte" },
            { typeof(char), "character" },
            { typeof(sbyte), "signed byte" },
            { typeof(Uri), "URI" },
            { typeof(float), "decimal number" },
            { typeof(double), "decimal number" },
            { typeof(decimal), "decimal number" },
            { typeof(string), "string" },
            { typeof(Guid), "globally unique identifier" },
            { typeof(TimeSpan), "time interval" },
            { typeof(DateTime), "date" },
            { typeof(DateTimeOffset), "date" },
            { typeof(bool), "boolean" },
        };

        public static IModelGeneratorProvider GetProvider(Type modelType)
        {
            if (DefaultTypeDocumentation.ContainsKey(modelType))
            {
                return new SimpleModelProvider();
            }

            if (modelType.IsEnum)
            {
                return new EnumModelProvider();
            }

            if (modelType.IsGenericType)
            {
                var genericArguments = modelType.GetGenericArguments();

                if (genericArguments.Length == 1)
                {
                    var enumerableType = typeof(IEnumerable<>).MakeGenericType(genericArguments);
                    if (enumerableType.IsAssignableFrom(modelType))
                    {
                        return new CollectionModelProvider(genericArguments[0]);
                    }
                }
                if (genericArguments.Length == 2)
                {
                    var dictionaryType = typeof(IDictionary<,>).MakeGenericType(genericArguments);
                    var keyValuePairType = typeof(KeyValuePair<,>).MakeGenericType(genericArguments);
                    if (dictionaryType.IsAssignableFrom(modelType) || keyValuePairType.IsAssignableFrom(modelType))
                    {
                        return new KeyValueModelProvider(genericArguments[0], genericArguments[1]);
                    }
                }
            }

            if (modelType.IsArray)
            {
                var elementType = modelType.GetElementType();
                return new CollectionModelProvider(elementType);
            }

            if (modelType == typeof(NameValueCollection))
            {
                return new KeyValueModelProvider(typeof(string), typeof(string));
            }

            if (typeof(IDictionary).IsAssignableFrom(modelType))
            {
                return new KeyValueModelProvider(typeof(object), typeof(object));
            }

            if (typeof (IEnumerable).IsAssignableFrom(modelType))
            {
                return new CollectionModelProvider(typeof (object));
            }
            return new ComplexModelProvider();
        }
    }

    public class ModelDescriptionGenerator
    {

        private readonly Lazy<IModelDocumentationProvider> _documentationProvider;

        public ModelDescriptionGenerator(HttpConfiguration config)
        {
            if (config == null)
            {
                throw new ArgumentNullException(nameof(config));
            }

            _documentationProvider = new Lazy<IModelDocumentationProvider>(() => config.Services.GetDocumentationProvider() as IModelDocumentationProvider);
        }

        public Dictionary<string, ModelDescription> GeneratedModels { get; } = new Dictionary<string, ModelDescription>(StringComparer.OrdinalIgnoreCase);

        public IModelDocumentationProvider DocumentationProvider => _documentationProvider.Value;

        public ModelDescription GetOrCreateModelDescription(Type modelType)
        {
            if (modelType == null)
            {
                throw new ArgumentNullException(nameof(modelType));
            }

            var underlyingType = Nullable.GetUnderlyingType(modelType);
            if (underlyingType != null)
            {
                modelType = underlyingType;
            }

            ModelDescription modelDescription;
            var modelName = ModelNameHelper.GetModelName(modelType);
            if (GeneratedModels.TryGetValue(modelName, out modelDescription))
            {
                if (modelType != modelDescription.ModelType)
                {
                    throw new InvalidOperationException(
                        string.Format(
                            CultureInfo.CurrentCulture,
                            "A model description could not be created. Duplicate model name '{0}' was found for types '{1}' and '{2}'. " +
                            "Use the [ModelName] attribute to change the model name for at least one of the types so that it has a unique name.",
                            modelName,
                            modelDescription.ModelType.FullName,
                            modelType.FullName));
                }

                return modelDescription;
            }

            var provider = ModelProviderFactory.GetProvider(modelType);
            return provider.Generate(modelType, this);
        }

        public static bool ShouldDisplayMember(MemberInfo member, bool hasDataContractAttribute)
        {
            var jsonIgnore = member.GetCustomAttribute<JsonIgnoreAttribute>();
            var xmlIgnore = member.GetCustomAttribute<XmlIgnoreAttribute>();
            var ignoreDataMember = member.GetCustomAttribute<IgnoreDataMemberAttribute>();
            var nonSerialized = member.GetCustomAttribute<NonSerializedAttribute>();
            var apiExplorerSetting = member.GetCustomAttribute<ApiExplorerSettingsAttribute>();

            var hasMemberAttribute = member.DeclaringType != null && (member.DeclaringType.IsEnum ?
                member.GetCustomAttribute<EnumMemberAttribute>() != null :
                member.GetCustomAttribute<DataMemberAttribute>() != null);

            // Display member only if all the followings are true:
            // no JsonIgnoreAttribute
            // no XmlIgnoreAttribute
            // no IgnoreDataMemberAttribute
            // no NonSerializedAttribute
            // no ApiExplorerSettingsAttribute with IgnoreApi set to true
            // no DataContractAttribute without DataMemberAttribute or EnumMemberAttribute
            return jsonIgnore == null &&
                xmlIgnore == null &&
                ignoreDataMember == null &&
                nonSerialized == null &&
                (apiExplorerSetting == null || !apiExplorerSetting.IgnoreApi) &&
                (!hasDataContractAttribute || hasMemberAttribute);
        }

        public string CreateDefaultDocumentation(Type type)
        {
            string documentation;
            if (ModelProviderFactory.DefaultTypeDocumentation.TryGetValue(type, out documentation))
            {
                return documentation;
            }
            if (DocumentationProvider != null)
            {
                documentation = DocumentationProvider.GetDocumentation(type);
            }

            return documentation;
        }

        
    }
}