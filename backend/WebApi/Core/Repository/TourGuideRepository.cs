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
    public class TourGuideDto
    {
        public long TourGuideId { get; set; }
        public string TourGuideName { get; set; }
        public string TourGuideDescription{ get; set; }
    }
    public interface ITourGuideRepository : IBaseRepository<TourGuide>
    {

    }
    class TourGuideRepository:BaseRepository<TourGuide>, ITourGuideRepository
    {
        public TourGuideRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
