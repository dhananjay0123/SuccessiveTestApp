using Microsoft.EntityFrameworkCore;
using System;
using PhoneListApi.DatabaseModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneListApi
{
    public class PhoneListContext : DbContext, IPhoneListContext
    {
        public PhoneListContext(DbContextOptions<PhoneListContext> options)
            : base(options)
        {
        }

        public DbSet<PersonDetail> PersonDetails { get; set; }
        public DbSet<PhoneDetail> PhoneDetails { get; set; }

        public void SetState<TEntity>(TEntity entity, EntityState state) where TEntity : class
        {
            SetState<TEntity>(entity, state);
        }

        void IPhoneListContext.SaveChanges()
        {
            SaveChanges();
        }
        Task IPhoneListContext.SaveChangesAsync()
        {
            return SaveChangesAsync();
        }
    }
}
