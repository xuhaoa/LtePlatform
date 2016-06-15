namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Customer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EmergencyCommunications", "TownId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EmergencyCommunications", "TownId");
        }
    }
}
