namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_Town_Type : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Towns", "Longtitute", c => c.Double(nullable: false));
            AddColumn("dbo.Towns", "Lattitute", c => c.Double(nullable: false));
            AddColumn("dbo.Towns", "AreaType", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Towns", "AreaType");
            DropColumn("dbo.Towns", "Lattitute");
            DropColumn("dbo.Towns", "Longtitute");
        }
    }
}
