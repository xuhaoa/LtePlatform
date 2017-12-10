namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Agps_To_Kpi1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MonthKpiStats", "YuejiComplains", c => c.Int(nullable: false));
            AddColumn("dbo.MonthKpiStats", "GongxinYuejiComplains", c => c.Int(nullable: false));
            DropColumn("dbo.MonthKpiStats", "YuejiComplainRate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MonthKpiStats", "YuejiComplainRate", c => c.Double(nullable: false));
            DropColumn("dbo.MonthKpiStats", "GongxinYuejiComplains");
            DropColumn("dbo.MonthKpiStats", "YuejiComplains");
        }
    }
}
