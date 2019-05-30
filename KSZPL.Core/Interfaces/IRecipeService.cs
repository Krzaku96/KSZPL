using KSZPL.Core.Dtos.Medicine;
using KSZPL.Core.Dtos.Recipe;
using System;
using System.Collections.Generic;
using System.Text;

namespace KSZPL.Core.Interfaces
{
    public interface IRecipeService
    {
        RegisterRecipeDto CreateModelToRegisterRecipe(int idVisit);
        ShowRecipeDto ShowRecipe(int idVisit);
        ShowToEditRecipeDto CreateModelToEditShowRecipe(int idRecipe);
        void GenerateRecipePdf(int idVisit);
        string GetMedicines(List<GetMedicineDto> getMedicineDtos);
    }
}
