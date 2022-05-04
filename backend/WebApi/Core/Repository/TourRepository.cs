using Core.Base;
using EntityFramework.Context;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public class TourDto
    {
        public long TourId { get; set; }
        public string TourName { get; set; }
        public string TourPrice { get; set; }
        public string TourTime { get; set; }
    }
    public interface ITourRepository : IBaseRepository<Tour>
    {

    }
    class TourRepository:BaseRepository<Tour>, ITourRepository
    {
        public TourRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
