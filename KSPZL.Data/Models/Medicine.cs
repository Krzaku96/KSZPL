using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KSZPL.Data.Models
{
    public class Medicine
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
