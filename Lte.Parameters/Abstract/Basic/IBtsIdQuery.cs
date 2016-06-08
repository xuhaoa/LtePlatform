namespace Lte.Parameters.Abstract.Basic
{
    public interface IBtsIdQuery
    {
        int BtsId { get; }
    }

    public interface ILteCellQuery
    {
        int ENodebId { get; set; }

        byte SectorId { get; set; }
    }
}
