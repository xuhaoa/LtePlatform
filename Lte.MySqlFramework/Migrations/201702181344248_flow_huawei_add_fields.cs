namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class flow_huawei_add_fields : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.FlowHuaweis", "RedirectCdma2000", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.FlowHuaweis", "RedirectCdma2000");
        }
    }
}
