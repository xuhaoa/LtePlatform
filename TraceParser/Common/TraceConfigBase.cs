using System;
using System.Collections.Generic;
using System.Linq;
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
}
