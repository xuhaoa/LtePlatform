using System;
using Abp.Domain.Entities;
using Abp.EntityFramework.Dependency;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Kpi
{
    public class MrsPhrStat : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public DateTime StatDate { get; set; }

        public int PowerHeadRoom_00 { get; set; }

        public int PowerHeadRoom_01 { get; set; }

        public int PowerHeadRoom_02 { get; set; }

        public int PowerHeadRoom_03 { get; set; }

        public int PowerHeadRoom_04 { get; set; }

        public int PowerHeadRoom_05 { get; set; }

        public int PowerHeadRoom_06 { get; set; }

        public int PowerHeadRoom_07 { get; set; }

        public int PowerHeadRoom_08 { get; set; }

        public int PowerHeadRoom_09 { get; set; }

        public int PowerHeadRoom_10 { get; set; }

        public int PowerHeadRoom_11 { get; set; }

        public int PowerHeadRoom_12 { get; set; }

        public int PowerHeadRoom_13 { get; set; }

        public int PowerHeadRoom_14 { get; set; }

        public int PowerHeadRoom_15 { get; set; }

        public int PowerHeadRoom_16 { get; set; }

        public int PowerHeadRoom_17 { get; set; }

        public int PowerHeadRoom_18 { get; set; }

        public int PowerHeadRoom_19 { get; set; }

        public int PowerHeadRoom_20 { get; set; }

        public int PowerHeadRoom_21 { get; set; }

        public int PowerHeadRoom_22 { get; set; }

        public int PowerHeadRoom_23 { get; set; }

        public int PowerHeadRoom_24 { get; set; }

        public int PowerHeadRoom_25 { get; set; }

        public int PowerHeadRoom_26 { get; set; }

        public int PowerHeadRoom_27 { get; set; }

        public int PowerHeadRoom_28 { get; set; }

        public int PowerHeadRoom_29 { get; set; }

        public int PowerHeadRoom_30 { get; set; }

        public int PowerHeadRoom_31 { get; set; }

        public int PowerHeadRoom_32 { get; set; }

        public int PowerHeadRoom_33 { get; set; }

        public int PowerHeadRoom_34 { get; set; }

        public int PowerHeadRoom_35 { get; set; }

        public int PowerHeadRoom_36 { get; set; }

        public int PowerHeadRoom_37 { get; set; }

        public int PowerHeadRoom_38 { get; set; }

        public int PowerHeadRoom_39 { get; set; }

        public int PowerHeadRoom_40 { get; set; }

        public int PowerHeadRoom_41 { get; set; }

        public int PowerHeadRoom_42 { get; set; }

        public int PowerHeadRoom_43 { get; set; }

        public int PowerHeadRoom_44 { get; set; }

        public int PowerHeadRoom_45 { get; set; }

        public int PowerHeadRoom_46 { get; set; }

        public int PowerHeadRoom_47 { get; set; }

        public int PowerHeadRoom_48 { get; set; }

        public int PowerHeadRoom_49 { get; set; }

        public int PowerHeadRoom_50 { get; set; }

        public int PowerHeadRoom_51 { get; set; }

        public int PowerHeadRoom_52 { get; set; }

        public int PowerHeadRoom_53 { get; set; }

        public int PowerHeadRoom_54 { get; set; }

        public int PowerHeadRoom_55 { get; set; }

        public int PowerHeadRoom_56 { get; set; }

        public int PowerHeadRoom_57 { get; set; }

        public int PowerHeadRoom_58 { get; set; }

        public int PowerHeadRoom_59 { get; set; }

        public int PowerHeadRoom_60 { get; set; }

        public int PowerHeadRoom_61 { get; set; }

        public int PowerHeadRoom_62 { get; set; }

        public int PowerHeadRoom_63 { get; set; }
    }

    public class MrsRsrpStat : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public DateTime StatDate { get; set; }

        public int RSRP_00 { get; set; }

        public int RSRP_01 { get; set; }

        public int RSRP_02 { get; set; }

        public int RSRP_03 { get; set; }

        public int RSRP_04 { get; set; }

        public int RSRP_05 { get; set; }

        public int RSRP_06 { get; set; }

        public int RSRP_07 { get; set; }

        public int RSRP_08 { get; set; }

        public int RSRP_09 { get; set; }

        public int RSRP_10 { get; set; }

        public int RSRP_11 { get; set; }

        public int RSRP_12 { get; set; }

        public int RSRP_13 { get; set; }

        public int RSRP_14 { get; set; }

        public int RSRP_15 { get; set; }

        public int RSRP_16 { get; set; }

        public int RSRP_17 { get; set; }

        public int RSRP_18 { get; set; }

        public int RSRP_19 { get; set; }

        public int RSRP_20 { get; set; }

        public int RSRP_21 { get; set; }

        public int RSRP_22 { get; set; }

        public int RSRP_23 { get; set; }

        public int RSRP_24 { get; set; }

        public int RSRP_25 { get; set; }

        public int RSRP_26 { get; set; }

        public int RSRP_27 { get; set; }

        public int RSRP_28 { get; set; }

        public int RSRP_29 { get; set; }

        public int RSRP_30 { get; set; }

        public int RSRP_31 { get; set; }

        public int RSRP_32 { get; set; }

        public int RSRP_33 { get; set; }

        public int RSRP_34 { get; set; }

        public int RSRP_35 { get; set; }

        public int RSRP_36 { get; set; }

        public int RSRP_37 { get; set; }

        public int RSRP_38 { get; set; }

        public int RSRP_39 { get; set; }

        public int RSRP_40 { get; set; }

        public int RSRP_41 { get; set; }

        public int RSRP_42 { get; set; }

        public int RSRP_43 { get; set; }

        public int RSRP_44 { get; set; }

        public int RSRP_45 { get; set; }

        public int RSRP_46 { get; set; }

        public int RSRP_47 { get; set; }
    }

    public class MrsSinrUlStat : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public DateTime StatDate { get; set; }

        public int SinrUL_00 { get; set; }

        public int SinrUL_01 { get; set; }

        public int SinrUL_02 { get; set; }

        public int SinrUL_03 { get; set; }

        public int SinrUL_04 { get; set; }

        public int SinrUL_05 { get; set; }

        public int SinrUL_06 { get; set; }

        public int SinrUL_07 { get; set; }

        public int SinrUL_08 { get; set; }

        public int SinrUL_09 { get; set; }

        public int SinrUL_10 { get; set; }

        public int SinrUL_11 { get; set; }

        public int SinrUL_12 { get; set; }

        public int SinrUL_13 { get; set; }

        public int SinrUL_14 { get; set; }

        public int SinrUL_15 { get; set; }

        public int SinrUL_16 { get; set; }

        public int SinrUL_17 { get; set; }

        public int SinrUL_18 { get; set; }

        public int SinrUL_19 { get; set; }

        public int SinrUL_20 { get; set; }

        public int SinrUL_21 { get; set; }

        public int SinrUL_22 { get; set; }

        public int SinrUL_23 { get; set; }

        public int SinrUL_24 { get; set; }

        public int SinrUL_25 { get; set; }

        public int SinrUL_26 { get; set; }

        public int SinrUL_27 { get; set; }

        public int SinrUL_28 { get; set; }

        public int SinrUL_29 { get; set; }

        public int SinrUL_30 { get; set; }

        public int SinrUL_31 { get; set; }

        public int SinrUL_32 { get; set; }

        public int SinrUL_33 { get; set; }

        public int SinrUL_34 { get; set; }

        public int SinrUL_35 { get; set; }

        public int SinrUL_36 { get; set; }
    }

    public class MrsTadvRsrpStat : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public DateTime StatDate { get; set; }

        public int Tadv00Rsrp00 { get; set; }

        public int Tadv00Rsrp01 { get; set; }

        public int Tadv00Rsrp02 { get; set; }

        public int Tadv00Rsrp03 { get; set; }

        public int Tadv00Rsrp04 { get; set; }

        public int Tadv00Rsrp05 { get; set; }

        public int Tadv00Rsrp06 { get; set; }

        public int Tadv00Rsrp07 { get; set; }

        public int Tadv00Rsrp08 { get; set; }

        public int Tadv00Rsrp09 { get; set; }

        public int Tadv00Rsrp10 { get; set; }

        public int Tadv00Rsrp11 { get; set; }

        public int Tadv01Rsrp00 { get; set; }

        public int Tadv01Rsrp01 { get; set; }

        public int Tadv01Rsrp02 { get; set; }

        public int Tadv01Rsrp03 { get; set; }

        public int Tadv01Rsrp04 { get; set; }

        public int Tadv01Rsrp05 { get; set; }

        public int Tadv01Rsrp06 { get; set; }

        public int Tadv01Rsrp07 { get; set; }

        public int Tadv01Rsrp08 { get; set; }

        public int Tadv01Rsrp09 { get; set; }

        public int Tadv01Rsrp10 { get; set; }

        public int Tadv01Rsrp11 { get; set; }

        public int Tadv02Rsrp00 { get; set; }

        public int Tadv02Rsrp01 { get; set; }

        public int Tadv02Rsrp02 { get; set; }

        public int Tadv02Rsrp03 { get; set; }

        public int Tadv02Rsrp04 { get; set; }

        public int Tadv02Rsrp05 { get; set; }

        public int Tadv02Rsrp06 { get; set; }

        public int Tadv02Rsrp07 { get; set; }

        public int Tadv02Rsrp08 { get; set; }

        public int Tadv02Rsrp09 { get; set; }

        public int Tadv02Rsrp10 { get; set; }

        public int Tadv02Rsrp11 { get; set; }

        public int Tadv03Rsrp00 { get; set; }

        public int Tadv03Rsrp01 { get; set; }

        public int Tadv03Rsrp02 { get; set; }

        public int Tadv03Rsrp03 { get; set; }

        public int Tadv03Rsrp04 { get; set; }

        public int Tadv03Rsrp05 { get; set; }

        public int Tadv03Rsrp06 { get; set; }

        public int Tadv03Rsrp07 { get; set; }

        public int Tadv03Rsrp08 { get; set; }

        public int Tadv03Rsrp09 { get; set; }

        public int Tadv03Rsrp10 { get; set; }

        public int Tadv03Rsrp11 { get; set; }

        public int Tadv04Rsrp00 { get; set; }

        public int Tadv04Rsrp01 { get; set; }

        public int Tadv04Rsrp02 { get; set; }

        public int Tadv04Rsrp03 { get; set; }

        public int Tadv04Rsrp04 { get; set; }

        public int Tadv04Rsrp05 { get; set; }

        public int Tadv04Rsrp06 { get; set; }

        public int Tadv04Rsrp07 { get; set; }

        public int Tadv04Rsrp08 { get; set; }

        public int Tadv04Rsrp09 { get; set; }

        public int Tadv04Rsrp10 { get; set; }

        public int Tadv04Rsrp11 { get; set; }

        public int Tadv05Rsrp00 { get; set; }

        public int Tadv05Rsrp01 { get; set; }

        public int Tadv05Rsrp02 { get; set; }

        public int Tadv05Rsrp03 { get; set; }

        public int Tadv05Rsrp04 { get; set; }

        public int Tadv05Rsrp05 { get; set; }

        public int Tadv05Rsrp06 { get; set; }

        public int Tadv05Rsrp07 { get; set; }

        public int Tadv05Rsrp08 { get; set; }

        public int Tadv05Rsrp09 { get; set; }

        public int Tadv05Rsrp10 { get; set; }

        public int Tadv05Rsrp11 { get; set; }

        public int Tadv06Rsrp00 { get; set; }

        public int Tadv06Rsrp01 { get; set; }

        public int Tadv06Rsrp02 { get; set; }

        public int Tadv06Rsrp03 { get; set; }

        public int Tadv06Rsrp04 { get; set; }

        public int Tadv06Rsrp05 { get; set; }

        public int Tadv06Rsrp06 { get; set; }

        public int Tadv06Rsrp07 { get; set; }

        public int Tadv06Rsrp08 { get; set; }

        public int Tadv06Rsrp09 { get; set; }

        public int Tadv06Rsrp10 { get; set; }

        public int Tadv06Rsrp11 { get; set; }

        public int Tadv07Rsrp00 { get; set; }

        public int Tadv07Rsrp01 { get; set; }

        public int Tadv07Rsrp02 { get; set; }

        public int Tadv07Rsrp03 { get; set; }

        public int Tadv07Rsrp04 { get; set; }

        public int Tadv07Rsrp05 { get; set; }

        public int Tadv07Rsrp06 { get; set; }

        public int Tadv07Rsrp07 { get; set; }

        public int Tadv07Rsrp08 { get; set; }

        public int Tadv07Rsrp09 { get; set; }

        public int Tadv07Rsrp10 { get; set; }

        public int Tadv07Rsrp11 { get; set; }

        public int Tadv08Rsrp00 { get; set; }

        public int Tadv08Rsrp01 { get; set; }

        public int Tadv08Rsrp02 { get; set; }

        public int Tadv08Rsrp03 { get; set; }

        public int Tadv08Rsrp04 { get; set; }

        public int Tadv08Rsrp05 { get; set; }

        public int Tadv08Rsrp06 { get; set; }

        public int Tadv08Rsrp07 { get; set; }

        public int Tadv08Rsrp08 { get; set; }

        public int Tadv08Rsrp09 { get; set; }

        public int Tadv08Rsrp10 { get; set; }

        public int Tadv08Rsrp11 { get; set; }

        public int Tadv09Rsrp00 { get; set; }

        public int Tadv09Rsrp01 { get; set; }

        public int Tadv09Rsrp02 { get; set; }

        public int Tadv09Rsrp03 { get; set; }

        public int Tadv09Rsrp04 { get; set; }

        public int Tadv09Rsrp05 { get; set; }

        public int Tadv09Rsrp06 { get; set; }

        public int Tadv09Rsrp07 { get; set; }

        public int Tadv09Rsrp08 { get; set; }

        public int Tadv09Rsrp09 { get; set; }

        public int Tadv09Rsrp10 { get; set; }

        public int Tadv09Rsrp11 { get; set; }

        public int Tadv10Rsrp00 { get; set; }

        public int Tadv10Rsrp01 { get; set; }

        public int Tadv10Rsrp02 { get; set; }

        public int Tadv10Rsrp03 { get; set; }

        public int Tadv10Rsrp04 { get; set; }

        public int Tadv10Rsrp05 { get; set; }

        public int Tadv10Rsrp06 { get; set; }

        public int Tadv10Rsrp07 { get; set; }

        public int Tadv10Rsrp08 { get; set; }

        public int Tadv10Rsrp09 { get; set; }

        public int Tadv10Rsrp10 { get; set; }

        public int Tadv10Rsrp11 { get; set; }

    }

    public class MrsTadvStat : IEntity<ObjectId>, IStatDateCell
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string CellId { get; set; }

        public DateTime StatDate { get; set; }

        public int Tadv_00 { get; set; }

        public int Tadv_01 { get; set; }

        public int Tadv_02 { get; set; }

        public int Tadv_03 { get; set; }

        public int Tadv_04 { get; set; }

        public int Tadv_05 { get; set; }

        public int Tadv_06 { get; set; }

        public int Tadv_07 { get; set; }

        public int Tadv_08 { get; set; }

        public int Tadv_09 { get; set; }

        public int Tadv_10 { get; set; }

        public int Tadv_11 { get; set; }

        public int Tadv_12 { get; set; }

        public int Tadv_13 { get; set; }

        public int Tadv_14 { get; set; }

        public int Tadv_15 { get; set; }

        public int Tadv_16 { get; set; }

        public int Tadv_17 { get; set; }

        public int Tadv_18 { get; set; }

        public int Tadv_19 { get; set; }

        public int Tadv_20 { get; set; }

        public int Tadv_21 { get; set; }

        public int Tadv_22 { get; set; }

        public int Tadv_23 { get; set; }

        public int Tadv_24 { get; set; }

        public int Tadv_25 { get; set; }

        public int Tadv_26 { get; set; }

        public int Tadv_27 { get; set; }

        public int Tadv_28 { get; set; }

        public int Tadv_29 { get; set; }

        public int Tadv_30 { get; set; }

        public int Tadv_31 { get; set; }

        public int Tadv_32 { get; set; }

        public int Tadv_33 { get; set; }

        public int Tadv_34 { get; set; }

        public int Tadv_35 { get; set; }

        public int Tadv_36 { get; set; }

        public int Tadv_37 { get; set; }

        public int Tadv_38 { get; set; }

        public int Tadv_39 { get; set; }

        public int Tadv_40 { get; set; }

        public int Tadv_41 { get; set; }

        public int Tadv_42 { get; set; }

        public int Tadv_43 { get; set; }

        public int Tadv_44 { get; set; }

    }
}
