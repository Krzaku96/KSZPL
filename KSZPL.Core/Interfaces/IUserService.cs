using System.Collections.Generic;
using KSZPL.Core.Dtos.User;
using KSZPL.Data.Models;

namespace KSZPL.Core.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
