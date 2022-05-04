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

        #region Citizen

        public DbSet<Citizen> Citizens { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<FriendShip> FriendShips { get; set; }

        #endregion

        #region Community
        public DbSet<House> Houses { get; set; }
        public DbSet<HouseDetail> HouseDetails { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Community> Communities { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        #endregion

        #region Bussiness Store
        public DbSet<StoreObject> StoreObjects { get; set; }
        public DbSet<StoreItem> StoreItems { get; set; }
        public DbSet<StoreOrder> StoreOrders { get; set; }
        public DbSet<Tour> Tours { get; set; }
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
            modelBuilder.Entity<BookingDetail>()
                .Property(p => p.CreationTime)
                .HasDefaultValueSql("getdate()");
            modelBuilder.Entity<FriendShip>()
                .Property(p => p.CreationTime)
                .HasDefaultValueSql("getdate()");
        }
    }
}
