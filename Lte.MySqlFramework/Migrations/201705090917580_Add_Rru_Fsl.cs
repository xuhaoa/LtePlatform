namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Rru_Fsl : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LteRrus", "PlanNum", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.LteRrus", "PlanNum");
        }
    }
}
