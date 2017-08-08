namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Town_Position_MySql1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AreaTestDates", "LatestDate2G", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.AreaTestDates", "LatestDate3G", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.AreaTestDates", "LatestDate4G", c => c.DateTime(nullable: false, precision: 0));
            DropColumn("dbo.AreaTestDates", "LatestTestDate2G");
            DropColumn("dbo.AreaTestDates", "LatestTestDate3G");
            DropColumn("dbo.AreaTestDates", "LatestTestDate4G");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AreaTestDates", "LatestTestDate4G", c => c.String(unicode: false));
            AddColumn("dbo.AreaTestDates", "LatestTestDate3G", c => c.String(unicode: false));
            AddColumn("dbo.AreaTestDates", "LatestTestDate2G", c => c.String(unicode: false));
            DropColumn("dbo.AreaTestDates", "LatestDate4G");
            DropColumn("dbo.AreaTestDates", "LatestDate3G");
            DropColumn("dbo.AreaTestDates", "LatestDate2G");
        }
    }
}
