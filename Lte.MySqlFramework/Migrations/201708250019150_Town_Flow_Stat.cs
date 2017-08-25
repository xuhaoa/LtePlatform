namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Town_Flow_Stat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownFlowStats", "FrequencyBandType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownFlowStats", "FrequencyBandType");
        }
    }
}
