namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_College_Test : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.College3GTestResults", "Place", c => c.String(unicode: false));
            AddColumn("dbo.College3GTestResults", "Tester", c => c.String(unicode: false));
            AddColumn("dbo.College4GTestResults", "Place", c => c.String(unicode: false));
            AddColumn("dbo.College4GTestResults", "Tester", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.College4GTestResults", "Tester");
            DropColumn("dbo.College4GTestResults", "Place");
            DropColumn("dbo.College3GTestResults", "Tester");
            DropColumn("dbo.College3GTestResults", "Place");
        }
    }
}
