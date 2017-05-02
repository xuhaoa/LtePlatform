namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_HotSpot : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.InfrastructureInfoes", "Address", c => c.String());
            AddColumn("dbo.InfrastructureInfoes", "SourceName", c => c.String());
            AddColumn("dbo.InfrastructureInfoes", "Longtitute", c => c.Double(nullable: false));
            AddColumn("dbo.InfrastructureInfoes", "Lattitute", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.InfrastructureInfoes", "Lattitute");
            DropColumn("dbo.InfrastructureInfoes", "Longtitute");
            DropColumn("dbo.InfrastructureInfoes", "SourceName");
            DropColumn("dbo.InfrastructureInfoes", "Address");
        }
    }
}
