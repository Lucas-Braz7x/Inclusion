using Microsoft.EntityFrameworkCore.Migrations;

namespace Inclusion.Migrations
{
    public partial class CorrecaoDoador : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idade",
                table: "Ongs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idade",
                table: "Ongs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
