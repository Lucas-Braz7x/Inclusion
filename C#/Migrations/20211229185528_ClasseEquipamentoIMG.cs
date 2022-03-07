using Microsoft.EntityFrameworkCore.Migrations;

namespace Inclusion.Migrations
{
    public partial class ClasseEquipamentoIMG : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "Equipamentos",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "Equipamentos");
        }
    }
}
