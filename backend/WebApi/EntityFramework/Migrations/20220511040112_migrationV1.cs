using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EntityFramework.Migrations
{
    public partial class migrationV1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EventDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventImage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EventStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EventEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "TourGuides",
                columns: table => new
                {
                    TourGuideId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourGuideName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TourGuideDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TourGuideImage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourGuides", x => x.TourGuideId);
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    TourId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourLocation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TourName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TourDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TourPrice = table.Column<double>(type: "float", nullable: false),
                    TourTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TourImage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TourGuideImage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TourGuideName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.TourId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UrlImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdentityNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "EventDescription", "EventEnd", "EventImage", "EventName", "EventStart" },
                values: new object[,]
                {
                    { 1L, "", new DateTime(2022, 5, 11, 11, 1, 11, 749, DateTimeKind.Local).AddTicks(1260), "/assets/image/home/event1.png", "LIKE THE MOON IN A NIGHT SKY 2022 / NHƯ TRĂNG TRONG ĐÊM...", new DateTime(2022, 5, 11, 11, 1, 11, 748, DateTimeKind.Local).AddTicks(235) },
                    { 2L, "", new DateTime(2022, 5, 11, 11, 1, 11, 749, DateTimeKind.Local).AddTicks(1615), "/assets/image/home/event2.png", "Sunlit NYE 2022 at Sunset Sanato Beach Club", new DateTime(2022, 5, 11, 11, 1, 11, 749, DateTimeKind.Local).AddTicks(1611) },
                    { 3L, "", new DateTime(2022, 5, 11, 11, 1, 11, 749, DateTimeKind.Local).AddTicks(1619), "/assets/image/home/event3.png", "Phú Quốc Odyssey 2022 ", new DateTime(2022, 5, 11, 11, 1, 11, 749, DateTimeKind.Local).AddTicks(1617) }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[] { 1, "admin" });

            migrationBuilder.InsertData(
                table: "TourGuides",
                columns: new[] { "TourGuideId", "TourGuideDescription", "TourGuideImage", "TourGuideName" },
                values: new object[,]
                {
                    { 1L, "10 năm kinh nghiệm về ngành lữ hành, Zoey 1 có kiến thức sâu rộng về mảng du lịch xa xỉ, tập trung vào thị trường Nhật Bản.", "/assets/image/community/consultant1.png", "Zoey 1" },
                    { 2L, "Đam mê với nghề và có nhiều năm dẫn các đoàn khách Âu/Mỹ thám hiểu những kì quan ở Việt Nam, Zoey 2 luôn đưa ra tư vấn phù hợp nhất tới du khách.", "/assets/image/community/consultant2.png", "Zoey 2" },
                    { 3L, "10 năm kinh nghiệm về ngành lữ hành, Zoey 1 có kiến thức sâu rộng về mảng du lịch xa xỉ, tập trung vào thị trường Nhật Bản.", "/assets/image/community/consultant3.png", "Zoey 3" }
                });

            migrationBuilder.InsertData(
                table: "Tours",
                columns: new[] { "TourId", "TourDescription", "TourGuideImage", "TourGuideName", "TourImage", "TourLocation", "TourName", "TourPrice", "TourTime" },
                values: new object[,]
                {
                    { 1L, "Zannier Hotels Bai San Coral is a luxury resort hidden in a natural conservation space.", "/assets/image/community/tourguide1.png", "Zoey1", "/assets/image/community/tour1.png", "Phú Yên, Việt Nam", "A paradise on Earth", 500.0, "3 days 2 nights" },
                    { 2L, "This tour is for travelers who want to experience an enormous cave – but may not have time for Son Doong.", "/assets/image/community/tourguide2.png", "Zoey2", "/assets/image/community/tour2.png", "Quảng Bình, Việt Nam", "Hang En Cave Adventure 2 Days with Oxalis", 350.0, "2 days 1 nights" },
                    { 3L, "Spend a night at the reputable Metropole in Hanoi and embark on the stylish Au Co.", "/assets/image/community/tourguide3.png", "Zoey3", "/assets/image/community/tour3.png", "Hà Nội & Quảng Ninh, VN", "Luxury Cruise Stay", 550.0, "2 days 1 nights" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "Email", "FullName", "IdentityNumber", "Password", "PhoneNumber", "RoleId", "UrlImage", "UserName" },
                values: new object[] { 1L, "admin@gmail.com", null, null, "70249761412257917910212813371042552712742", null, 1, null, "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "TourGuides");

            migrationBuilder.DropTable(
                name: "Tours");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
