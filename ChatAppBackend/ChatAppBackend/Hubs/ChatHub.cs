using ChatAppBackend.Entities;
using ChatAppBackend.Repositories;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ChatAppBackend.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatRepository _chatRepository;

        public ChatHub(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public List<MessageDTO> GetMessages()
        {
            return _chatRepository.GetMessages();
        }

        public async Task GetActiveUsers()
        {
            await _chatRepository.GetActiveUsers();
        }

        public async Task SendMessage(string jsonMessage)
        {
            var message = JsonConvert.DeserializeObject<MessageDTO>(jsonMessage);
            await _chatRepository.SendMessage(message);
        }

        public async Task UserConnected(string username)
        {
            await _chatRepository.UserConnected(username);
        }

        public async Task UserDisconnected(string username)
        {
            await _chatRepository.UserDisconnected(username);
        }
    }
}
