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
        private IMapper _mapper;
        //shouldn't use session in Hub, so use a static dictionary =))
        private static Dictionary<string, string> _store = new Dictionary<string, string>();

        public MyHub(IMapper mapper)
        {
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
    }
}
