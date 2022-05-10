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
    public class EventDto
    {
        public long EventId { get; set; }
        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public string EventImage { get; set; }
        public string EventStart { get; set; }
        public string EventEnd { get; set; }
    }
    public interface IEventRepository : IBaseRepository<Event>
    {

    }
    class EventRepository:BaseRepository<Event>, IEventRepository
    {
        public EventRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
