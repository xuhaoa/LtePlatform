using System;
using System.Collections.Generic;
using Lte.Domain.Common;
using TraceParser.Common;

namespace TraceParser.Eutra
{
    [Serializable]
    public class AreaConfiguration_r10 : TraceConfig
    {
        public List<CellGlobalIdEUTRA> cellGlobalIdList_r10 { get; set; }

        public List<string> trackingAreaCodeList_r10 { get; set; }

        public class PerDecoder : DecoderBase<AreaConfiguration_r10>
        {
            public static readonly PerDecoder Instance = new PerDecoder();
            
            protected override void ProcessConfig(AreaConfiguration_r10 config, BitArrayInputStream input)
            {
                InitDefaults();
                switch (input.readBits(1))
                {
                    case 0:
                        {
                            config.cellGlobalIdList_r10 = new List<CellGlobalIdEUTRA>();
                            int num4 = input.readBits(5) + 1;
                            for (int i = 0; i < num4; i++)
                            {
                                CellGlobalIdEUTRA item = CellGlobalIdEUTRA.PerDecoder.Instance.Decode(input);
                                config.cellGlobalIdList_r10.Add(item);
                            }
                            return;
                        }
                    case 1:
                        {
                            config.trackingAreaCodeList_r10 = new List<string>();
                            int num6 = input.readBits(3) + 1;
                            for (int j = 0; j < num6; j++)
                            {
                                string str = input.readBitString(0x10);
                                config.trackingAreaCodeList_r10.Add(str);
                            }
                            return;
                        }
                }
                throw new Exception(GetType().Name + ":NoChoice had been choose");
            }
        }
    }

    [Serializable]
    public class AreaConfiguration_v1130 : TraceConfig
    {
        public TrackingAreaCodeList_v1130 trackingAreaCodeList_v1130 { get; set; }

        public class PerDecoder : DecoderBase<AreaConfiguration_v1130>
        {
            public static readonly PerDecoder Instance = new PerDecoder();
            
            protected override void ProcessConfig(AreaConfiguration_v1130 config, BitArrayInputStream input)
            {
                InitDefaults();
                config.trackingAreaCodeList_v1130 = TrackingAreaCodeList_v1130.PerDecoder.Instance.Decode(input);
            }
        }
    }

}
