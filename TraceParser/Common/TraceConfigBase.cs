﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common;

namespace TraceParser.Common
{
    public abstract class TraceConfig
    {
        public static void InitDefaults()
        {
        }
    }

    public interface IDecoder<out TConfig>
        where TConfig : TraceConfig
    {
        TConfig Decode(BitArrayInputStream input);
    }

    public abstract class DecoderBase<TConfig> : IDecoder<TConfig>
        where TConfig : TraceConfig, new()
    {
        public TConfig Decode(BitArrayInputStream input)
        {
            TraceConfig.InitDefaults();
            var config = new TConfig();
            ProcessConfig(config, input);
            return config;
        }

        protected abstract void ProcessConfig(TConfig config, BitArrayInputStream input);
    }

    [AttributeUsage(AttributeTargets.Field)]
    public class CodeBitAttribute : Attribute
    {
        public int Position { get; set; } = 0;

        public int BitToBeRead { get; set; } = 1;
    }

    [AttributeUsage(AttributeTargets.Class)]
    public class CodeBitChoiceAttribute : Attribute
    {
        public int Choice { get; set; } = 8;
    }
    
    public static class CodeBitReaderOpertions
    {
        public static IEnumerable<Tuple<FieldInfo, int, int>> ConstructCodeBitReader(Type type)
        {
            return (from field in type.GetFields()
                let attribute = Attribute.GetCustomAttribute(field, typeof (CodeBitAttribute)) as CodeBitAttribute
                where attribute != null
                select new Tuple<FieldInfo, int, int>(field, attribute.Position, attribute.BitToBeRead));
        }

        public static void ReadCodeBits<T>(this T source, IEnumerable<Tuple<FieldInfo, int, int>> reader,
            IBitArrayReader input)
        {
            var attribute = typeof (T).GetCustomAttribute<CodeBitChoiceAttribute>();
            if (attribute == null) return;
            foreach (var tuple in reader)
            {
                for (var i = 0; i < attribute.Choice; i++)
                    if (tuple.Item2 == i)
                    {
                        tuple.Item1.SetValue(source, input.ReadBitString(tuple.Item3));
                        return;
                    }
            }
            throw new Exception(typeof(T).Name + ":NoChoice had been choose");
        }
    }
}
