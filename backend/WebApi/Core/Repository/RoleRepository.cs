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
    public interface IRoleRepository : IBaseRepository<Role>
    {
    }
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(
            MyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
