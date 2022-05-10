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
        }
    }
}
