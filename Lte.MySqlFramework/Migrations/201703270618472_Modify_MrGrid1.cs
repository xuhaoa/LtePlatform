namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Modify_MrGrid1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MrGrids", "Compete", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.MrGrids", "Compete");
        }
    }
}
