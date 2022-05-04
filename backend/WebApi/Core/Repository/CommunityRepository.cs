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
    public interface ICommunityRepository : IBaseRepository<Community>
    {

    }
    public class CommunityRepository : BaseRepository<Community>, ICommunityRepository
    {
        public CommunityRepository(
            MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
