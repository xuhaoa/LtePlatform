namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Town_Mrs_Rsrp1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownMrsRsrps", "RsrpBelow120", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownMrsRsrps", "RsrpBelow120");
        }
    }
}
