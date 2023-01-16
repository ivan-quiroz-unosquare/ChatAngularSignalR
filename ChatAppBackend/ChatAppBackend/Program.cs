using ChatAppBackend.Hubs;

namespace ChatAppBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var startup = new Startup(builder.Configuration);

            // Add services to the container
            startup.ConfigureServices(builder.Services);

            var app = builder.Build();

            startup.Configure(app, app.Environment);

            app.MapHub<ChatHub>("/hubs/chat");

            app.Run();
        }
    }
}