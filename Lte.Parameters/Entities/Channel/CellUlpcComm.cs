using Abp.Domain.Entities;
using Abp.EntityFramework.Dependency;
using Lte.Domain.Regular.Attributes;
using MongoDB.Bson;

namespace Lte.Parameters.Entities.Channel
{
    [TypeDoc("��Ϊ���п��Ʋ���")]
    public class CellUlpcComm : IEntity<ObjectId>, IHuaweiCellMongo
    {
        public bool IsTransient()
        {
            return false;
        }

        public ObjectId Id { get; set; }

        public string iDate { get; set; }

        public int eNodeB_Id { get; set; }

        public string eNodeBId_Name { get; set; }

        [MemberDoc("��Ϣ2����ƫ��, �ò���Ϊ���������������е�Msg3�Ĺ���ƫ��ֵ���ò���Ҳ���ڿ���PUSCH/PUCCH�ıջ������ۻ�����ʼֵ���ò�����������TDD��")]
        public int DeltaMsg2 { get; set; }

        [MemberDoc("PUCCH��ʽ2b��ƫ�ã��ò�����ʾPUCCH��ʽ2b��Deltaֵ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaFPUCCHFormat2b { get; set; }

        [MemberDoc("PUSCH���P0ֵ���ò�����ʾPUSCH�ı��P0ֵ��Ӧ�������й��ع��̣�������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int P0NominalPUSCH { get; set; }

        [MemberDoc("PUCCH��ʽ2a��ƫ�ã��ò�����ʾPUCCH��ʽ2a��Deltaֵ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaFPUCCHFormat2a { get; set; }

        [MemberDoc("��Ϣ3���ǰ���Ĺ���ƫ�ã��ò�����ʾ��Ϣ3��ǰ��Deltaֵ������Ϊ2��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaPreambleMsg3 { get; set; }

        [MemberDoc("PUCCH��ʽ1b��ƫ�ã��ò�����ʾPUCCH��ʽ1b��Deltaֵ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaFPUCCHFormat1b { get; set; }

        [MemberDoc("PUCCH���P0ֵ���ò�����ʾ��������PUCCH�����eNodeB��������PUCCH���书��ˮƽ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int P0NominalPUCCH { get; set; }

        [MemberDoc("PUCCH��ʽ1��ƫ�ã��ò�����ʾPUCCH��ʽ1��Deltaֵ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaFPUCCHFormat1 { get; set; }

        [MemberDoc("·��������ӣ��ò�����ʾ·����Ĳ������ӣ�Ӧ�������й��ع��̣�������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int PassLossCoeff { get; set; }

        [MemberDoc("PUCCH��ʽ2��ƫ�ã��ò�����ʾPUCCH��ʽ2��Deltaֵ��������ʹ��ϸ����μ�3GPP TS 36.213��")]
        public int DeltaFPUCCHFormat2 { get; set; }

        public int LocalCellId { get; set; }

        public int? DeltaFPUCCHFormat1bc { get; set; }

        public int? DeltaFPUCCHFormat1bcs { get; set; }

        public int? DeltaFPUCCHFormat3 { get; set; }
    }
}