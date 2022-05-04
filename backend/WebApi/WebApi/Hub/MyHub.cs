using AutoMapper;
using Core.Enum;
using Core.Repository;
using EntityFramework.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.HubSpace
{
    public class MyHub : Hub
    {
        private IBookingDetailRepository _bookingDetailRepos;
        private IFriendshipRepository _friendshipRepos;
        private IMapper _mapper;
        //shouldn't use session in Hub, so use a static dictionary =))
        private static Dictionary<string, string> _store = new Dictionary<string, string>();

        public MyHub(IBookingDetailRepository bookingDetailRepos,
            IFriendshipRepository friendshipRepos,
            IMapper mapper)
        {
            _bookingDetailRepos = bookingDetailRepos;
            _friendshipRepos = friendshipRepos;
            _mapper = mapper;
        }
        public string GetConnectionId(string userId)
        {
            _store[userId] = Context.ConnectionId;
            return Context.ConnectionId;
        }
        public void SendMessage(ChatMessageDto chatMessageDto)
        {
            try
            {
                Clients.Clients(_store[chatMessageDto.TargetUserId.ToString()]).SendAsync("SendMessageToClient", chatMessageDto);
                Clients.Client(_store[chatMessageDto.UserId.ToString()]).SendAsync("SendMessageToClient", chatMessageDto);
            }
            catch (Exception)
            {
            }
        }
        public void FriendshipRequest(FriendShipDto friendShipDto)
        {
            try
            {
                //check if exist
                var exist = from friendship in _friendshipRepos.GetAll()
                            where (friendship.UserId == friendShipDto.UserId
                            && friendship.FriendUserId == friendShipDto.FriendUserId)
                            | (friendship.UserId == friendShipDto.FriendUserId
                            && friendship.FriendUserId == friendShipDto.UserId)
                            select friendship;
                

                //if send friendship request
                if (friendShipDto.State == FriendshipState.NotFriend)
                {
                    friendShipDto.State = FriendshipState.Requesting;
                    var friendshipUser = _mapper.Map<FriendShip>(friendShipDto);
                    _friendshipRepos.Create(friendshipUser);
                    //create another friendship for target friend
                    var friendshipFriend = _mapper.Map<FriendShip>(friendShipDto);
                    friendshipFriend.UserId = friendShipDto.FriendUserId;
                    friendshipFriend.FriendUserId = friendShipDto.UserId;
                    _friendshipRepos.Create(friendshipFriend);
                }
                //if accept friendship request
                else if(friendShipDto.State == FriendshipState.Requesting)
                {
                    //accept from target friend
                    var friendshipUser = _friendshipRepos.Get(f => f.UserId == friendShipDto.UserId && f.FriendUserId == friendShipDto.FriendUserId);
                    friendshipUser.State = FriendshipState.Accepted;
                    _friendshipRepos.Update(friendshipUser);
                    var friendshipFriend = _friendshipRepos.Get(f =>f.UserId == friendShipDto.FriendUserId && f.FriendUserId == friendShipDto.UserId);
                    friendshipFriend.State = FriendshipState.Accepted;
                    _friendshipRepos.Update(friendshipFriend);
                }

                Clients.All.SendAsync("SendRequestToClient", friendShipDto);
            }
            catch (Exception)
            {
            }
        }

        public void ApproveBooking(BookingDetailDto dto)
        {
            try
            {
                //Nếu trạng thái là chờ duyệt thì gửi thông báo cho admin
                // Còn không thì cập nhật state của booking đó
                if(dto.State == (int)CommunityEnum.STATE_BOOKING.PENDING)
                {
                    Clients.All.SendAsync("ReceiveBookingNotice", dto);
                }
                else
                {
                    var entity = _mapper.Map<BookingDetail>(dto);
                    _bookingDetailRepos.Update(entity);
                    Clients.All.SendAsync("BookingUpdated", dto);
                }
            }
            catch (Exception)
            {
            }
        }
    }
}
