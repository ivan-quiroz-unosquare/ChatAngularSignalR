using ChatAppBackend.Entities;
using ChatAppBackend.Hubs;
using ChatAppBackend.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace ChatAppBackend.Services
{
    public class ChatService : IChatRepository
    {
        private readonly IHubContext<ChatHub> _chatHub;
        private static List<string> _activeUsers;
        private static List<MessageDTO> _messageHistory;

        public ChatService(IHubContext<ChatHub> hubContext)
        {
            _chatHub = hubContext;
            _activeUsers = new List<string>();
            _messageHistory = new List<MessageDTO>();
        }

        public async Task GetActiveUsers()
        {
            await _chatHub.Clients.All.SendAsync("RefreshActiveUserList", _activeUsers);
        }

        public List<MessageDTO> GetMessages()
        {
            return _messageHistory;
        }

        public async Task SendMessage(MessageDTO message)
        {
            await _chatHub.Clients.All.SendAsync("NewMessage", message);
            _messageHistory.Add(message);
        }

        public async Task UserConnected(string username)
        {
            _activeUsers.Add(username);

            var systemMessage = new MessageDTO
            {
                UserName = "System",
                Date = DateTime.Now,
                Content = $"{username} joined the chat."
            };

            await SendMessage(systemMessage);

            await _chatHub.Clients.All.SendAsync("RefreshActiveUserList", _activeUsers);
        }

        public async Task UserDisconnected(string username)
        {
            _activeUsers.Remove(username);

            var systemMessage = new MessageDTO
            {
                UserName = "System",
                Date = DateTime.Now,
                Content = $"{username} left the chat."
            };

            await SendMessage(systemMessage);

            await _chatHub.Clients.All.SendAsync("RefreshActiveUserList", _activeUsers);
        }
    }
}
