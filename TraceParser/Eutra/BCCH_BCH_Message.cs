using System;
using Lte.Domain.Common;
using TraceParser.Common;

namespace TraceParser.Eutra
{
    [Serializable]
    public class BCCH_BCH_Message : TraceConfig
    {
        public MasterInformationBlock message { get; set; }

        public class PerDecoder : DecoderBase<BCCH_BCH_Message>
        {
            public static readonly PerDecoder Instance = new PerDecoder();

            protected override void ProcessConfig(BCCH_BCH_Message config, BitArrayInputStream input)
            {
                InitDefaults();
                config.message = MasterInformationBlock.PerDecoder.Instance.Decode(input);
            }
        }
    }

    [Serializable]
    public class BCCH_DL_SCH_Message : TraceConfig
    {
        public BCCH_DL_SCH_MessageType message { get; set; }

        public class PerDecoder : DecoderBase<BCCH_DL_SCH_Message>
        {
            public static readonly PerDecoder Instance = new PerDecoder();

            protected override void ProcessConfig(BCCH_DL_SCH_Message config, BitArrayInputStream input)
            {
                InitDefaults();
                config.message = BCCH_DL_SCH_MessageType.PerDecoder.Instance.Decode(input);
            }
        }
    }
}
