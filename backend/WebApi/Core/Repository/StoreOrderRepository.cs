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
    public interface IStoreOrderRepository : IBaseRepository<StoreOrder>
    {

    }
    class StoreOrderRepository:BaseRepository<StoreOrder>, IStoreOrderRepository
    {
        public StoreOrderRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
