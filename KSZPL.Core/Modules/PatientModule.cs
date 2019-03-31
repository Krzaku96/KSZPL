using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;

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
