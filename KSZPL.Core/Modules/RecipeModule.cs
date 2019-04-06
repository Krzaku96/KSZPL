using Autofac;
using KSZPL.Data.Models;
using KSZPL.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Modules
{
    class RecipeModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<Repository<Recipe>>().As<IRepository<Recipe>>().InstancePerDependency();
        }
    }
}
