namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Town_Qci_Long : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.TownQciStats", "Cqi0Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi1Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi2Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi3Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi4Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi5Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi6Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi7Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi8Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi9Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi10Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi11Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi12Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi13Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi14Times", c => c.Long(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi15Times", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.TownQciStats", "Cqi15Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi14Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi13Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi12Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi11Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi10Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi9Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi8Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi7Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi6Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi5Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi4Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi3Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi2Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi1Times", c => c.Int(nullable: false));
            AlterColumn("dbo.TownQciStats", "Cqi0Times", c => c.Int(nullable: false));
        }
    }
}
