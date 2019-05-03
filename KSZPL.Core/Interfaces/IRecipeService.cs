using KSZPL.Core.Dtos.Recipe;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IRecipeService
    {
        RegisterRecipeDto CreateModelToRegisterRecipe(int idVisit);
    }
}
