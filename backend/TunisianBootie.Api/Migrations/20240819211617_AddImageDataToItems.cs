using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TunisianBootie.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImageDataToItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Items",
                newName: "ImageMimeType");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "Items",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "ImageMimeType",
                table: "Items",
                newName: "Image");
        }
    }
}
