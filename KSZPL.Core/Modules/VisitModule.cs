using Autofac;
using KSZPL.Core.Interfaces;
using KSZPL.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Modules
{
    class VisitModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<VisitService>().As<IVisitService>().InstancePerDependency();
        }
    }
}
