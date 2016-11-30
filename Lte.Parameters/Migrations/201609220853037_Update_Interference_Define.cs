namespace Lte.Parameters.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class Update_Interference_Define : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.InterferenceMatrixStats", "StatTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.InterferenceMatrixStats", "StatTime", c => c.DateTime(nullable: false));
        }
    }
}
