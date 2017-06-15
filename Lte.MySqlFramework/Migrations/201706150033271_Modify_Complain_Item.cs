namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Modify_Complain_Item : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ComplainItems", "ServiceCategory", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ComplainItems", "ServiceCategory");
        }
    }
}
