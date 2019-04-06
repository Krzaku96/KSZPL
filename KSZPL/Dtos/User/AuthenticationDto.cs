using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KSZPL.Api.Dtos.User
{
    public class AuthenticationDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
