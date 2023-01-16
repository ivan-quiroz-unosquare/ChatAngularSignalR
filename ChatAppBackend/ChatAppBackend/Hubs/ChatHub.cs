using ChatAppBackend.Entities;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Security.Claims;

namespace ChatAppBackend.Hubs
{
    public class ChatHub : Hub
    {
        public ChatHub() { }

        public async Task SendMessage(string jsonMessage)
        {
            var message = JsonConvert.DeserializeObject<MessageDTO>(jsonMessage);
            await Clients.All.SendAsync("NewMessage", message);
        }
    }
}
