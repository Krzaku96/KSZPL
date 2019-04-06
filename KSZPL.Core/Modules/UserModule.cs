using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;

namespace KSZPL.Core.Modules
{
    class UserModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserService>().As<IUserService>().InstancePerDependency();
        }
    }
}
