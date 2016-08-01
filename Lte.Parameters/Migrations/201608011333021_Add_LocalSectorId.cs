namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_LocalSectorId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cells", "LocalSectorId", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cells", "LocalSectorId");
        }
    }
}
