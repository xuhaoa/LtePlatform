namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Interference : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.InterferenceMatrixStats", "StatTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "CellId", c => c.String());
            AddColumn("dbo.InterferenceMatrixStats", "Pci", c => c.Short(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "NeighborPci", c => c.Short(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "StatDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Diff0", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Diff3", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Diff6", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Diff9", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Diff12", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "DiffLarge", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUl0to9", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUl10to19", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUl20to24", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUl25to29", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUl30to34", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SinrUlAbove35", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpBelow120", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpBetween120110", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpBetween110105", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpBetween105100", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpBetween10090", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RsrpAbove90", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta0or1", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta2or3", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta4or5", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta6or7", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta8or9", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta10to12", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta13to15", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta16to19", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta20to24", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta25to29", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Ta30to39", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "TaAbove40", c => c.Int(nullable: false));
            DropColumn("dbo.InterferenceMatrixStats", "RecordTime");
            DropColumn("dbo.InterferenceMatrixStats", "ENodebId");
            DropColumn("dbo.InterferenceMatrixStats", "SectorId");
            DropColumn("dbo.InterferenceMatrixStats", "DestPci");
            DropColumn("dbo.InterferenceMatrixStats", "Mod3Interferences");
            DropColumn("dbo.InterferenceMatrixStats", "Mod6Interferences");
            DropColumn("dbo.InterferenceMatrixStats", "OverInterferences6Db");
            DropColumn("dbo.InterferenceMatrixStats", "OverInterferences10Db");
            DropColumn("dbo.InterferenceMatrixStats", "InterferenceLevel");
        }
        
        public override void Down()
        {
            AddColumn("dbo.InterferenceMatrixStats", "InterferenceLevel", c => c.Double(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "OverInterferences10Db", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "OverInterferences6Db", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Mod6Interferences", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "Mod3Interferences", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "DestPci", c => c.Short(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "SectorId", c => c.Byte(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "ENodebId", c => c.Int(nullable: false));
            AddColumn("dbo.InterferenceMatrixStats", "RecordTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.InterferenceMatrixStats", "TaAbove40");
            DropColumn("dbo.InterferenceMatrixStats", "Ta30to39");
            DropColumn("dbo.InterferenceMatrixStats", "Ta25to29");
            DropColumn("dbo.InterferenceMatrixStats", "Ta20to24");
            DropColumn("dbo.InterferenceMatrixStats", "Ta16to19");
            DropColumn("dbo.InterferenceMatrixStats", "Ta13to15");
            DropColumn("dbo.InterferenceMatrixStats", "Ta10to12");
            DropColumn("dbo.InterferenceMatrixStats", "Ta8or9");
            DropColumn("dbo.InterferenceMatrixStats", "Ta6or7");
            DropColumn("dbo.InterferenceMatrixStats", "Ta4or5");
            DropColumn("dbo.InterferenceMatrixStats", "Ta2or3");
            DropColumn("dbo.InterferenceMatrixStats", "Ta0or1");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpAbove90");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpBetween10090");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpBetween105100");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpBetween110105");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpBetween120110");
            DropColumn("dbo.InterferenceMatrixStats", "RsrpBelow120");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUlAbove35");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUl30to34");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUl25to29");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUl20to24");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUl10to19");
            DropColumn("dbo.InterferenceMatrixStats", "SinrUl0to9");
            DropColumn("dbo.InterferenceMatrixStats", "DiffLarge");
            DropColumn("dbo.InterferenceMatrixStats", "Diff12");
            DropColumn("dbo.InterferenceMatrixStats", "Diff9");
            DropColumn("dbo.InterferenceMatrixStats", "Diff6");
            DropColumn("dbo.InterferenceMatrixStats", "Diff3");
            DropColumn("dbo.InterferenceMatrixStats", "Diff0");
            DropColumn("dbo.InterferenceMatrixStats", "StatDate");
            DropColumn("dbo.InterferenceMatrixStats", "NeighborPci");
            DropColumn("dbo.InterferenceMatrixStats", "Pci");
            DropColumn("dbo.InterferenceMatrixStats", "CellId");
            DropColumn("dbo.InterferenceMatrixStats", "StatTime");
        }
    }
}
