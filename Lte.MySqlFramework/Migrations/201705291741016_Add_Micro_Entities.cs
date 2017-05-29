namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Micro_Entities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MicroAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AddressNumber = c.String(unicode: false),
                        District = c.String(unicode: false),
                        Address = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        BaseStation = c.String(unicode: false),
                        TownId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MicroItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        Type = c.String(unicode: false),
                        ItemNumber = c.String(unicode: false),
                        Factory = c.String(unicode: false),
                        AddressNumber = c.String(unicode: false),
                        BorrowDate = c.DateTime(nullable: false, precision: 0),
                        Borrower = c.String(unicode: false),
                        Complainer = c.String(unicode: false),
                        ComplainPhone = c.String(unicode: false),
                        MateriaNumber = c.String(unicode: false),
                        SubmitForm = c.String(unicode: false),
                        Protocol = c.String(unicode: false),
                        SerialNumber = c.String(unicode: false),
                        Comments = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MicroItems");
            DropTable("dbo.MicroAddresses");
        }
    }
}
