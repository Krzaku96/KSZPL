using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using KSZPL.Data.Repository;

namespace KSZPL.Core.Modules
{
    class PatientModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<PatientService>().As<IPatientService>().InstancePerDependency();
        }
    }
}
