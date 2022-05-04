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
    public class FriendShipDto
    {
        public long FriendShipId { get; set; }
        public long UserId { get; set; }
        public long FriendUserId {get;set;}
        public string FriendUserName { get; set; }
        public string FriendProfilePictureId { get; set; }
        public bool IsOnline { get; set; }
        public FriendshipState State { get; set; }
    }
    public interface IFriendshipRepository : IBaseRepository<FriendShip>
    {

    }
    public class FriendshipRepository : BaseRepository<FriendShip>, IFriendshipRepository
    {
        public FriendshipRepository(MyDbContext dbContext) : base(dbContext)
        {

        }
    }
}
