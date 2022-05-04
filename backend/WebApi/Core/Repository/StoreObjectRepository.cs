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
    public interface IStoreObjectRepository : IBaseRepository<StoreObject>
    {

    }
    class StoreObjectRepository:BaseRepository<StoreObject>, IStoreObjectRepository
    {
        public StoreObjectRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
