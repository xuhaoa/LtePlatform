using System.Collections.Generic;
using System;
using System.Linq;
using System.Text;

namespace AutoMapper
{
    public class AutoMapperConfigurationException : Exception
    {
        public TypeMapConfigErrors[] Errors { get; }
        public ResolutionContext Context { get; }

        public class TypeMapConfigErrors
        {
            public TypeMap TypeMap { get; }
            public string[] UnmappedPropertyNames { get; }

            public TypeMapConfigErrors(TypeMap typeMap, string[] unmappedPropertyNames)
            {
                TypeMap = typeMap;
                UnmappedPropertyNames = unmappedPropertyNames;
            }
        }

        public AutoMapperConfigurationException(string message)
            : base(message)
        {
        }

        public AutoMapperConfigurationException(TypeMapConfigErrors[] errors)
        {
            Errors = errors;
        }

        public AutoMapperConfigurationException(ResolutionContext context)
        {
            Context = context;
        }

        public override string Message
        {
            get
            {
                if (Context != null)
                {
                    var contextToUse = Context;
                    var message =
                        string.Format(
                            "The following property on {0} cannot be mapped: \n\t{2}\nAdd a custom mapping expression, ignore, add a custom resolver, or modify the destination type {1}.",
                            contextToUse.DestinationType.FullName, contextToUse.DestinationType.FullName,
                            contextToUse.GetContextPropertyMap().DestinationProperty.Name);

                    message += "\nContext:";

                    while (contextToUse != null)
                    {
                        message += contextToUse.GetContextPropertyMap() == null
                            ? string.Format("\n\tMapping from type {1} to {0}", contextToUse.DestinationType.FullName,
                                contextToUse.SourceType.FullName)
                            : string.Format("\n\tMapping to property {0} from {2} to {1}",
                                contextToUse.GetContextPropertyMap().DestinationProperty.Name,
                                contextToUse.DestinationType.FullName, contextToUse.SourceType.FullName);
                        contextToUse = contextToUse.Parent;
                    }

                    return message + "\n" + base.Message;
                }
                if (Errors != null)
                {
                    var message =
                        new StringBuilder(
                            "\nUnmapped members were found. Review the types and members below.\nAdd a custom mapping expression, ignore, add a custom resolver, or modify the source/destination type\n");

                    foreach (var error in Errors)
                    {
                        var len = error.TypeMap.SourceType.FullName.Length +
                                  error.TypeMap.DestinationType.FullName.Length + 5;

                        message.AppendLine(new string('=', len));
                        message.AppendLine(error.TypeMap.SourceType.Name + " -> " + error.TypeMap.DestinationType.Name +
                                           " (" +
                                           error.TypeMap.ConfiguredMemberList + " member list)");
                        message.AppendLine(error.TypeMap.SourceType.FullName + " -> " +
                                           error.TypeMap.DestinationType.FullName + " (" +
                                           error.TypeMap.ConfiguredMemberList + " member list)");
                        message.AppendLine();
                        message.AppendLine("Unmapped properties:");
                        foreach (var name in error.UnmappedPropertyNames)
                        {
                            message.AppendLine(name);
                        }
                    }
                    return message.ToString();
                }
                return base.Message;
            }
        }

        public override string StackTrace
        {
            get
            {
                if (Errors != null)
                    return string.Join(Environment.NewLine,
                        base.StackTrace
                            .Split(new[] {Environment.NewLine}, StringSplitOptions.None)
                            .Where(str => !str.TrimStart().StartsWith("at AutoMapper."))
                            .ToArray());

                return base.StackTrace;
            }
        }
    }

    public class AutoMapperMappingException : Exception
    {
        private readonly string _message;

        //
        // For guidelines regarding the creation of new exception types, see
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
        // and
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
        //

        public AutoMapperMappingException()
        {
        }

        public AutoMapperMappingException(string message)
            : base(message)
        {
            _message = message;
        }

        public AutoMapperMappingException(string message, Exception inner)
            : base(null, inner)
        {
            _message = message;
        }

        public AutoMapperMappingException(ResolutionContext context)
        {
            Context = context;
        }

        public AutoMapperMappingException(ResolutionContext context, Exception inner)
            : base(null, inner)
        {
            Context = context;
        }

        public AutoMapperMappingException(ResolutionContext context, string message)
            : this(context)
        {
            _message = message;
        }

        public ResolutionContext Context { get; }

        public override string Message
        {
            get
            {
                string message = null;
                var newLine = Environment.NewLine;
                if (Context != null)
                {
                    message = _message + newLine + newLine + "Mapping types:";
                    message += newLine +
                               $"{Context.SourceType.Name} -> {Context.DestinationType.Name}";
                    message += newLine +
                               $"{Context.SourceType.FullName} -> {Context.DestinationType.FullName}";

                    var destPath = GetDestPath(Context);
                    message += newLine + newLine + "Destination path:" + newLine + destPath;

                    message += newLine + newLine + "Source value:" + newLine + (Context.SourceValue ?? "(null)");

                    return message;
                }
                if (_message != null)
                {
                    message = _message;
                }

                message = (message == null ? null : message + newLine) + base.Message;

                return message;
            }
        }

        private string GetDestPath(ResolutionContext context)
        {
            var allContexts = GetContexts(context).Reverse();

            var builder = new StringBuilder(allContexts.First().DestinationType.Name);

            foreach (var ctxt in allContexts)
            {
                if (!string.IsNullOrEmpty(ctxt.MemberName))
                {
                    builder.Append(".");
                    builder.Append(ctxt.MemberName);
                }
                if (ctxt.ArrayIndex != null)
                {
                    builder.AppendFormat("[{0}]", ctxt.ArrayIndex);
                }
            }
            return builder.ToString();
        }

        private static IEnumerable<ResolutionContext> GetContexts(ResolutionContext context)
        {
            while (context.Parent != null)
            {
                yield return context;

                context = context.Parent;
            }
            yield return context;
        }

#if !DEBUG
        public override string StackTrace
        {
            get
            {
                return string.Join(Environment.NewLine,
                    base.StackTrace
                        .Split(new[] { Environment.NewLine }, StringSplitOptions.None)
                        .Where(str => !str.TrimStart().StartsWith("at AutoMapper.")));
            }
        }
#endif
    }
}