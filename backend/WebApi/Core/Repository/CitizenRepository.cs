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
    public class CitizenDto
    {
        public long? CitizenId { get; set; }
        public User User { get; set; }
        public long? UserId { get; set; }
        public string CitizenName { get; set; }
        public string UrlImage { get; set; }
        public string IdentityNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public int? Gender { get; set; }
        public int? Job { get; set; }
        public string Keyword { get; set; }
    }
    public interface ICitizenRepository : IBaseRepository<Citizen>
    {

    }
    class CitizenRepository:BaseRepository<Citizen>, ICitizenRepository
    {
        public CitizenRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
