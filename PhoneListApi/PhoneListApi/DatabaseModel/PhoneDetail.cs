using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneListApi.DatabaseModel
{
    public class PhoneDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PhoneDetailId { get; set; }
        public string PhoneNumber { get; set; }

        public virtual PersonDetail PersonDetail { get; set; }
    }
}
