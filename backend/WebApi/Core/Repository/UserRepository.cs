using Core.Base;
using EntityFramework.Context;
using EntityFramework.Entity;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public interface IUserRepository : IBaseRepository<User>
    {
    }
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(
            MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
