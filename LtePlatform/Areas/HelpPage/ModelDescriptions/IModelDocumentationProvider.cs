using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Reflection;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace LtePlatform.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }

    public interface IModelGeneratorProvider
    {
        ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator);
    }

    public class SimpleModelProvider : IModelGeneratorProvider
    {
        public ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator)
        {
            var simpleModelDescription = new SimpleTypeModelDescription
            {
                Name = ModelNameHelper.GetModelName(modelType),
                ModelType = modelType,
                Documentation = generator.CreateDefaultDocumentation(modelType)
            };
            generator.GeneratedModels.Add(simpleModelDescription.Name, simpleModelDescription);

            return simpleModelDescription;
        }
    }

    public class EnumModelProvider : IModelGeneratorProvider
    {
        public ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator)
        {
            var enumDescription = new EnumTypeModelDescription
            {
                Name = ModelNameHelper.GetModelName(modelType),
                ModelType = modelType,
                Documentation = generator.CreateDefaultDocumentation(modelType)
            };
            var hasDataContractAttribute = modelType.GetCustomAttribute<DataContractAttribute>() != null;
            foreach (var field in modelType.GetFields(BindingFlags.Public | BindingFlags.Static))
            {
                if (!ModelDescriptionGenerator.ShouldDisplayMember(field, hasDataContractAttribute)) continue;
                var enumValue = new EnumValueDescription
                {
                    Name = field.Name,
                    Value = field.GetRawConstantValue().ToString()
                };
                if (generator.DocumentationProvider != null)
                {
                    enumValue.Documentation = generator.DocumentationProvider.GetDocumentation(field);
                }
                enumDescription.Values.Add(enumValue);
            }
            generator.GeneratedModels.Add(enumDescription.Name, enumDescription);

            return enumDescription;
        }
    }

    public class CollectionModelProvider : IModelGeneratorProvider
    {
        private readonly Type _elementType;

        public ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator)
        {
            var collectionModelDescription = generator.GetOrCreateModelDescription(_elementType);
            if (collectionModelDescription != null)
            {
                return new CollectionModelDescription
                {
                    Name = ModelNameHelper.GetModelName(modelType),
                    ModelType = modelType,
                    ElementDescription = collectionModelDescription
                };
            }

            return null;
        }

        public CollectionModelProvider(Type elementType)
        {
            _elementType = elementType;
        }
    }
    
    public class KeyValueModelProvider : IModelGeneratorProvider
    {
        private readonly Type _keyType;
        private readonly Type _valueType;

        public KeyValueModelProvider(Type keyType, Type valueType)
        {
            _keyType = keyType;
            _valueType = valueType;
        }

        public ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator)
        {
            var keyModelDescription = generator.GetOrCreateModelDescription(_keyType);
            var valueModelDescription = generator.GetOrCreateModelDescription(_valueType);

            return new KeyValuePairModelDescription
            {
                Name = ModelNameHelper.GetModelName(modelType),
                ModelType = modelType,
                KeyModelDescription = keyModelDescription,
                ValueModelDescription = valueModelDescription
            };
        }
    }

    public class ComplexModelProvider : IModelGeneratorProvider
    {
        public ModelDescription Generate(Type modelType, ModelDescriptionGenerator generator)
        {
            var complexModelDescription = new ComplexTypeModelDescription
            {
                Name = ModelNameHelper.GetModelName(modelType),
                ModelType = modelType,
                Documentation = generator.CreateDefaultDocumentation(modelType)
            };

            generator.GeneratedModels.Add(complexModelDescription.Name, complexModelDescription);
            var hasDataContractAttribute = modelType.GetCustomAttribute<DataContractAttribute>() != null;
            var properties = modelType.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (var property in properties)
            {
                if (!ModelDescriptionGenerator.ShouldDisplayMember(property, hasDataContractAttribute)) continue;
                var propertyModel = new ParameterDescription
                {
                    Name = GetMemberName(property, hasDataContractAttribute)
                };

                if (generator.DocumentationProvider != null)
                {
                    propertyModel.Documentation = generator.DocumentationProvider.GetDocumentation(property);
                }

                GenerateAnnotations(property, propertyModel);
                complexModelDescription.Properties.Add(propertyModel);
                propertyModel.TypeDescription = generator.GetOrCreateModelDescription(property.PropertyType);
            }

            var fields = modelType.GetFields(BindingFlags.Public | BindingFlags.Instance);
            foreach (var field in fields)
            {
                if (!ModelDescriptionGenerator.ShouldDisplayMember(field, hasDataContractAttribute)) continue;
                var propertyModel = new ParameterDescription
                {
                    Name = GetMemberName(field, hasDataContractAttribute)
                };

                if (generator.DocumentationProvider != null)
                {
                    propertyModel.Documentation = generator.DocumentationProvider.GetDocumentation(field);
                }

                complexModelDescription.Properties.Add(propertyModel);
                propertyModel.TypeDescription = generator.GetOrCreateModelDescription(field.FieldType);
            }

            return complexModelDescription;
        }

        private void GenerateAnnotations(MemberInfo property, ParameterDescription propertyModel)
        {
            var annotations = new List<ParameterAnnotation>();

            var attributes = property.GetCustomAttributes();
            foreach (var attribute in attributes)
            {
                Func<object, string> textGenerator;
                if (_annotationTextGenerator.TryGetValue(attribute.GetType(), out textGenerator))
                {
                    annotations.Add(
                        new ParameterAnnotation
                        {
                            AnnotationAttribute = attribute,
                            Documentation = textGenerator(attribute)
                        });
                }
            }

            // Rearrange the annotations
            annotations.Sort((x, y) =>
            {
                // Special-case RequiredAttribute so that it shows up on top
                if (x.AnnotationAttribute is RequiredAttribute)
                {
                    return -1;
                }
                if (y.AnnotationAttribute is RequiredAttribute)
                {
                    return 1;
                }

                // Sort the rest based on alphabetic order of the documentation
                return string.Compare(x.Documentation, y.Documentation, StringComparison.OrdinalIgnoreCase);
            });

            foreach (var annotation in annotations)
            {
                propertyModel.Annotations.Add(annotation);
            }
        }

        // Modify this to support more data annotation attributes.
        private readonly IDictionary<Type, Func<object, string>> _annotationTextGenerator = new Dictionary<Type, Func<object, string>>
        {
            { typeof(RequiredAttribute), a => "Required" },
            { typeof(RangeAttribute), a =>
                {
                    var range = (RangeAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "Range: inclusive between {0} and {1}", range.Minimum, range.Maximum);
                }
            },
            { typeof(MaxLengthAttribute), a =>
                {
                    var maxLength = (MaxLengthAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "Max length: {0}", maxLength.Length);
                }
            },
            { typeof(MinLengthAttribute), a =>
                {
                    var minLength = (MinLengthAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "Min length: {0}", minLength.Length);
                }
            },
            { typeof(StringLengthAttribute), a =>
                {
                    var strLength = (StringLengthAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "String length: inclusive between {0} and {1}", strLength.MinimumLength, strLength.MaximumLength);
                }
            },
            { typeof(DataTypeAttribute), a =>
                {
                    var dataType = (DataTypeAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "Data type: {0}", dataType.CustomDataType ?? dataType.DataType.ToString());
                }
            },
            { typeof(RegularExpressionAttribute), a =>
                {
                    var regularExpression = (RegularExpressionAttribute)a;
                    return string.Format(CultureInfo.CurrentCulture, "Matching regular expression pattern: {0}", regularExpression.Pattern);
                }
            },
        };

        // Change this to provide different name for the member.
        private static string GetMemberName(MemberInfo member, bool hasDataContractAttribute)
        {
            var jsonProperty = member.GetCustomAttribute<JsonPropertyAttribute>();
            if (!string.IsNullOrEmpty(jsonProperty?.PropertyName))
            {
                return jsonProperty.PropertyName;
            }

            if (!hasDataContractAttribute) return member.Name;
            var dataMember = member.GetCustomAttribute<DataMemberAttribute>();
            return !string.IsNullOrEmpty(dataMember?.Name) ? dataMember.Name : member.Name;
        }

    }
}