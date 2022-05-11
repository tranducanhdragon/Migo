using EntityFramework.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityFramework.Context
{
    public class MyDbContext : DbContext
    {

        #region DbSet
        public DbSet<User> Users { set; get; }
        public DbSet<Role> Roles { get; set; }

        #region Tours
        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourGuide> TourGuides { get; set; }
        #endregion
        #region Events
        public DbSet<Event> Events { get; set; }
        #endregion

        #endregion
        public MyDbContext(DbContextOptions<MyDbContext> options):base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<User>(entity => {
            //    // create index in column
            //    entity.HasIndex(p => p.UserId).IsUnique();
            //});
            //modelBuilder.Entity<Citizen>(entity =>
            //{
            //    entity.HasIndex(p => p.CitizenId).IsUnique();
            //});
            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    RoleName = "admin",
                    RoleId = 1,
                }
            );
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Email = "admin@gmail.com",
                    UserName = "admin",
                    Password = "70249761412257917910212813371042552712742",
                    RoleId = 1,
                }    
            );
            modelBuilder.Entity<Tour>().HasData(
                new Tour
                {
                    TourId = 1,
                    TourName = "A paradise on Earth",
                    TourLocation = "Phú Yên, Việt Nam",
                    TourImage = "/assets/image/community/tour1.png",
                    TourDescription = "Zannier Hotels Bai San Coral is a luxury " +
                    "resort hidden in a natural conservation space.",
                    TourPrice = 500,
                    TourTime = "3 days 2 nights",
                    TourGuideName = "Zoey1",
                    TourGuideImage = "/assets/image/community/tourguide1.png"
                },
                new Tour
                {
                    TourId = 2,
                    TourName = "Hang En Cave Adventure 2 Days with Oxalis",
                    TourLocation = "Quảng Bình, Việt Nam",
                    TourImage = "/assets/image/community/tour2.png",
                    TourDescription = "This tour is for travelers who want to " +
                    "experience an enormous cave – but may not have time for Son Doong.",
                    TourPrice = 350,
                    TourTime = "2 days 1 nights",
                    TourGuideName = "Zoey2",
                    TourGuideImage = "/assets/image/community/tourguide2.png"
                },
                new Tour
                {
                    TourId = 3,
                    TourName = "Luxury Cruise Stay",
                    TourLocation = "Hà Nội & Quảng Ninh, VN",
                    TourImage = "/assets/image/community/tour3.png",
                    TourDescription = "Spend a night at the reputable Metropole " +
                    "in Hanoi and embark on the stylish Au Co.",
                    TourPrice = 550,
                    TourTime = "2 days 1 nights",
                    TourGuideName = "Zoey3",
                    TourGuideImage = "/assets/image/community/tourguide3.png"
                }
            );
            modelBuilder.Entity<TourGuide>().HasData(
                new TourGuide
                {
                    TourGuideId = 1,
                    TourGuideName = "Zoey 1",
                    TourGuideImage = "/assets/image/community/consultant1.png",
                    TourGuideDescription = "10 năm kinh nghiệm về ngành lữ " +
                    "hành, Zoey 1 có kiến thức sâu rộng về mảng du lịch xa xỉ, " +
                    "tập trung vào thị trường Nhật Bản."
                },
                new TourGuide
                {
                    TourGuideId = 2,
                    TourGuideName = "Zoey 2",
                    TourGuideImage = "/assets/image/community/consultant2.png",
                    TourGuideDescription = "Đam mê với nghề và có nhiều năm dẫn " +
                    "các đoàn khách Âu/Mỹ thám hiểu những kì quan " +
                    "ở Việt Nam, Zoey 2 luôn đưa ra tư vấn phù hợp nhất tới du khách."
                },
                new TourGuide
                {
                    TourGuideId = 3,
                    TourGuideName = "Zoey 3",
                    TourGuideImage = "/assets/image/community/consultant3.png",
                    TourGuideDescription = "10 năm kinh nghiệm về ngành lữ hành, Zoey 1 " +
                    "có kiến thức sâu rộng về mảng du lịch xa xỉ, tập trung vào thị trường Nhật Bản."
                }
            );
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    EventId = 1,
                    EventName = "LIKE THE MOON IN A NIGHT SKY 2022 / NHƯ TRĂNG TRONG ĐÊM...",
                    EventDescription ="",
                    EventImage = "/assets/image/home/event1.png",
                    EventStart = DateTime.Now,
                    EventEnd = DateTime.Now,
                },
                new Event
                {
                    EventId = 2,
                    EventName = "Sunlit NYE 2022 at Sunset Sanato Beach Club",
                    EventDescription = "",
                    EventImage = "/assets/image/home/event2.png",
                    EventStart = DateTime.Now,
                    EventEnd = DateTime.Now,
                },
                new Event
                {
                    EventId = 3,
                    EventName = "Phú Quốc Odyssey 2022 ",
                    EventDescription = "",
                    EventImage = "/assets/image/home/event3.png",
                    EventStart = DateTime.Now,
                    EventEnd = DateTime.Now,
                }
            );
        }
    }
}
