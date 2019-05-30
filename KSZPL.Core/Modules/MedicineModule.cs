using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;

namespace KSZPL.Core.Modules
{
    class MedicineModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<Repository<Medicine>>().As<IRepository<Medicine>>().InstancePerDependency();
            builder.RegisterType<MedicineService>().As<IMedicineService>().InstancePerDependency();
        }
    }
}