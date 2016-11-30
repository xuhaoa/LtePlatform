using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(LtePlatform.Startup))]

namespace LtePlatform
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
