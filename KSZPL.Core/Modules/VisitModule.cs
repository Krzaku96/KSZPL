using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Modules
{
    class VisitModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<Repository<Visit>>().As<IRepository<Visit>>().InstancePerDependency();
            builder.RegisterType<Repository<Patient>>().As<IRepository<Patient>>().InstancePerDependency();
            builder.RegisterType<Repository<User>>().As<IRepository<User>>().InstancePerDependency();
            builder.RegisterType<VisitService>().As<IVisitService>().InstancePerDependency();
            builder.RegisterType<Repository<PatientCard>>().As<IRepository<PatientCard>>().InstancePerDependency();
        }
    }
}
