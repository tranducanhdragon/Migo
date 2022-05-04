﻿// <auto-generated />
using System;
using EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EntityFramework.Migrations
{
    [DbContext(typeof(MyDbContext))]
    partial class MyDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EntityFramework.Entity.BookingDetail", b =>
                {
                    b.Property<long>("BookingDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("CommunityId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreationTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdentityNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ServiceName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("State")
                        .HasColumnType("int");

                    b.Property<int>("Total")
                        .HasColumnType("int");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("BookingDetailId");

                    b.HasIndex("CommunityId");

                    b.HasIndex("UserId");

                    b.ToTable("BookingDetail");
                });

            modelBuilder.Entity("EntityFramework.Entity.ChatMessage", b =>
                {
                    b.Property<long>("ChatMessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ReadState")
                        .HasColumnType("int");

                    b.Property<int>("Side")
                        .HasColumnType("int");

                    b.Property<long>("TargetUserId")
                        .HasColumnType("bigint");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("ChatMessageId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMessage");
                });

            modelBuilder.Entity("EntityFramework.Entity.Citizen", b =>
                {
                    b.Property<long?>("CitizenId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("CitizenName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("IdentityNumber")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int?>("Job")
                        .HasColumnType("int");

                    b.Property<string>("UrlImage")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("CitizenId");

                    b.HasIndex("UserId");

                    b.ToTable("Citizen");
                });

            modelBuilder.Entity("EntityFramework.Entity.Community", b =>
                {
                    b.Property<long>("CommunityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("ServiceName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("ServicePrice")
                        .HasColumnType("int");

                    b.Property<string>("UrlImage")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CommunityId");

                    b.ToTable("Community");
                });

            modelBuilder.Entity("EntityFramework.Entity.FriendShip", b =>
                {
                    b.Property<long>("FriendShipId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<long>("FriendUserId")
                        .HasColumnType("bigint");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<bool>("isOnline")
                        .HasColumnType("bit");

                    b.HasKey("FriendShipId");

                    b.HasIndex("UserId");

                    b.ToTable("FriendShip");
                });

            modelBuilder.Entity("EntityFramework.Entity.House", b =>
                {
                    b.Property<long>("HouseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<long?>("CadastralMapNumber")
                        .HasColumnType("bigint");

                    b.Property<int?>("HouseArea")
                        .HasColumnType("int");

                    b.Property<int?>("HouseType")
                        .HasColumnType("int");

                    b.Property<long?>("LandNumber")
                        .HasColumnType("bigint");

                    b.Property<string>("UrlImage")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("HouseId");

                    b.ToTable("House");
                });

            modelBuilder.Entity("EntityFramework.Entity.HouseDetail", b =>
                {
                    b.Property<long>("HouseDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("CitizenId")
                        .HasColumnType("bigint");

                    b.Property<long?>("HouseId")
                        .HasColumnType("bigint");

                    b.HasKey("HouseDetailId");

                    b.HasIndex("CitizenId");

                    b.HasIndex("HouseId");

                    b.ToTable("HouseDetail");
                });

            modelBuilder.Entity("EntityFramework.Entity.Notification", b =>
                {
                    b.Property<long>("NotificationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("NotificationType")
                        .HasColumnType("int");

                    b.Property<string>("UrlImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("NotificationId");

                    b.HasIndex("UserId");

                    b.ToTable("Notification");
                });

            modelBuilder.Entity("EntityFramework.Entity.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RoleName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("RoleId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreItem", b =>
                {
                    b.Property<long>("StoreItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Like")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Properties")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("State")
                        .HasColumnType("int");

                    b.Property<long?>("StoreObjectId")
                        .HasColumnType("bigint");

                    b.Property<int?>("Type")
                        .HasColumnType("int");

                    b.HasKey("StoreItemId");

                    b.HasIndex("StoreObjectId");

                    b.ToTable("StoreItems");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreObject", b =>
                {
                    b.Property<long>("StoreObjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Like")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Owner")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Properties")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<int?>("StoreType")
                        .HasColumnType("int");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("StoreObjectId");

                    b.HasIndex("UserId");

                    b.ToTable("StoreObjects");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreOrder", b =>
                {
                    b.Property<long>("StoreOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Orderer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("OrdererId")
                        .HasColumnType("bigint");

                    b.Property<string>("Properties")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("State")
                        .HasColumnType("int");

                    b.Property<long?>("StoreItemId")
                        .HasColumnType("bigint");

                    b.Property<long?>("StoreObjectId")
                        .HasColumnType("bigint");

                    b.Property<double?>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<int?>("Type")
                        .HasColumnType("int");

                    b.HasKey("StoreOrderId");

                    b.HasIndex("StoreItemId");

                    b.HasIndex("StoreObjectId");

                    b.ToTable("StoreOrders");
                });

            modelBuilder.Entity("EntityFramework.Entity.Tour", b =>
                {
                    b.Property<long>("TourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TourName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourPrice")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TourTime")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TourId");

                    b.ToTable("Tours");
                });

            modelBuilder.Entity("EntityFramework.Entity.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdentityNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Password")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("UrlImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.BookingDetail", b =>
                {
                    b.HasOne("EntityFramework.Entity.Community", "Community")
                        .WithMany()
                        .HasForeignKey("CommunityId");

                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Community");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.ChatMessage", b =>
                {
                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.Citizen", b =>
                {
                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.FriendShip", b =>
                {
                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.HouseDetail", b =>
                {
                    b.HasOne("EntityFramework.Entity.Citizen", "Citizen")
                        .WithMany()
                        .HasForeignKey("CitizenId");

                    b.HasOne("EntityFramework.Entity.House", "House")
                        .WithMany()
                        .HasForeignKey("HouseId");

                    b.Navigation("Citizen");

                    b.Navigation("House");
                });

            modelBuilder.Entity("EntityFramework.Entity.Notification", b =>
                {
                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreItem", b =>
                {
                    b.HasOne("EntityFramework.Entity.StoreObject", "StoreObject")
                        .WithMany()
                        .HasForeignKey("StoreObjectId");

                    b.Navigation("StoreObject");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreObject", b =>
                {
                    b.HasOne("EntityFramework.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EntityFramework.Entity.StoreOrder", b =>
                {
                    b.HasOne("EntityFramework.Entity.StoreItem", "StoreItem")
                        .WithMany()
                        .HasForeignKey("StoreItemId");

                    b.HasOne("EntityFramework.Entity.StoreObject", "StoreObject")
                        .WithMany()
                        .HasForeignKey("StoreObjectId");

                    b.Navigation("StoreItem");

                    b.Navigation("StoreObject");
                });

            modelBuilder.Entity("EntityFramework.Entity.User", b =>
                {
                    b.HasOne("EntityFramework.Entity.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
