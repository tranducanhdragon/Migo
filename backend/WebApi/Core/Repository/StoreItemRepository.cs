﻿using Core.Base;
using EntityFramework.Context;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public interface IStoreItemRepository : IBaseRepository<StoreItem>
    {

    }
    class StoreItemRepository:BaseRepository<StoreItem>, IStoreItemRepository
    {
        public StoreItemRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}