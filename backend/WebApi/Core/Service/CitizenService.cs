using AutoMapper;
using Core.Properties;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface ICitizenService : IBaseService<Citizen>
    {
        DataResult<IEnumerable<User>> GetAllUserNotFriend(long? userId);
        DataResult<IEnumerable<User>> GetAllUserFriend(long? userId);
        DataResult<IEnumerable<User>> GetAllUsersFilter(UserDto userDto);
        DataResult<IEnumerable<Citizen>> GetAllCitizensFilter(CitizenDto citizenDto);
    }
    public class CitizenService : BaseService<Citizen>, ICitizenService
    {
        private IUserRepository _userRepos;
        private IFriendshipRepository _friendshipRepos;
        private IMapper _mapper;
        public CitizenService(
            ICitizenRepository CitizenRepo,
            IUserRepository userRepos,
            IFriendshipRepository friendshipRepos,
            IMapper mapper) 
            : base(CitizenRepo)
        {
            _friendshipRepos = friendshipRepos;
            _userRepos = userRepos;
            _mapper = mapper;
        }
        public DataResult<IEnumerable<User>> GetAllUserNotFriend(long? userId)
        {
            try
            {
                var userFriendships = from friendships in _friendshipRepos.GetAll()
                                     where friendships.UserId == userId
                                    select friendships;
                var userNotFriends = _userRepos.GetAll();
                if(userFriendships.ToList().Count > 0)
                {
                    var userNotAccepts = from usersNotAccept in _userRepos.GetAll()
                                                 join friendships in userFriendships.ToList()
                                                 on usersNotAccept.UserId equals friendships.FriendUserId
                                                 where friendships.State != FriendshipState.Accepted
                                                 select usersNotAccept;
                    var userAccepts = from usersNotAccept in _userRepos.GetAll()
                                     join friendships in userFriendships.ToList()
                                     on usersNotAccept.UserId equals friendships.FriendUserId
                                     where friendships.State == FriendshipState.Accepted
                                     select usersNotAccept;
                    userNotFriends = userNotFriends.Except(userAccepts.ToList()).ToList();
                }
                                    
                return DataResult<IEnumerable<User>>.ResultSuccess(userNotFriends.ToList(), Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<User>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<User>> GetAllUserFriend(long? userId)
        {
            try
            {
                var userFriendships = from friendships in _friendshipRepos.GetAll()
                                      where friendships.UserId == userId
                                      select friendships;
                if (userFriendships.ToList().Count > 0)
                {
                    var userFriends = from users in _userRepos.GetAll()
                                     join friendships in userFriendships.ToList()
                                     on users.UserId equals friendships.FriendUserId
                                     where friendships.State == FriendshipState.Accepted
                                     select users;
                    return DataResult<IEnumerable<User>>.ResultSuccess(userFriends.ToList(), Resources.Get_All_Success);
                }
                return DataResult<IEnumerable<User>>.ResultSuccess(null, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<User>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }

        public DataResult<IEnumerable<User>> GetAllUsersFilter(UserDto userDto)
        {
            try
            {
                var result = (from users in _userRepos.GetAll()
                             where users.UserName.Contains(userDto.UserName)
                             select users).ToList();
                return DataResult<IEnumerable<User>>.ResultSuccess(result, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<User>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public DataResult<IEnumerable<Citizen>> GetAllCitizensFilter(CitizenDto citizenDto)
        {
            try
            {
                var result = (from citizens in base._repository.GetAll()
                              where citizens.CitizenName.Contains(citizenDto.Keyword)
                              || citizens.Address.Contains(citizenDto.Keyword)
                              || citizens.IdentityNumber.Contains(citizenDto.Keyword)
                              select citizens).ToList();
                return DataResult<IEnumerable<Citizen>>.ResultSuccess(result, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<IEnumerable<Citizen>>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
    }
}
