using ChatAppBackend.Entities;

namespace ChatAppBackend.Repositories
{
    public interface IChatRepository
    {
        List<MessageDTO> GetMessages();
        Task SendMessage(MessageDTO message);
        Task GetActiveUsers();
        Task UserConnected(string username);
        Task UserDisconnected(string username);
    }
}
