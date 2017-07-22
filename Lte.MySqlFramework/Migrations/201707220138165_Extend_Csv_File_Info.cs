namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_Csv_File_Info : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CsvFilesInfoes", "Count", c => c.Int(nullable: false));
            AddColumn("dbo.CsvFilesInfoes", "CoverageCount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CsvFilesInfoes", "CoverageCount");
            DropColumn("dbo.CsvFilesInfoes", "Count");
        }
    }
}
