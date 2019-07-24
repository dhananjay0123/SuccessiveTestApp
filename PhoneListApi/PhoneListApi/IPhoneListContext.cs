using Microsoft.EntityFrameworkCore;
using PhoneListApi.DatabaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneListApi
{
    public interface IPhoneListContext
    {
        DbSet<PersonDetail> PersonDetails { get; set; }
        DbSet<PhoneDetail> PhoneDetails { get; set; }
      


        void SetState<TEntity>(TEntity entity, EntityState state) where TEntity : class;

        void SaveChanges();
        Task SaveChangesAsync();


    }
}
