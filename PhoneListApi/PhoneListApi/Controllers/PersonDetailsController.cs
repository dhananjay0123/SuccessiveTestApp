using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneListApi;
using PhoneListApi.Models;

namespace PhoneListApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonDetailsController : ControllerBase
    {
        private readonly IPhoneListContext _context;

        public PersonDetailsController(IPhoneListContext context)
        {
            _context = context;
        }

        // GET: api/PersonDetails
        [HttpGet]
        public IEnumerable<PersonDetail> GetPersonDetails()
        {
            var ps = from p in  _context.PersonDetails select
                     new PersonDetail()
                     {
                        Id = p.PersonId, FirstName = p.FirstName, LastName = p.LastName,
                      PhoneNumbers= (from pn in p.PhoneDetails select pn.PhoneNumber).ToList()
                     };
            return ps;
            
        }

        // GET: api/PersonDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersonDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personDetail = await _context.PersonDetails.FindAsync(id);

            if (personDetail == null)
            {
                return NotFound();
            }

            var pd = new PersonDetail()
            {
                Id = personDetail.PersonId,
                FirstName = personDetail.FirstName,
                LastName = personDetail.LastName,
                PhoneNumbers = (from pn in personDetail.PhoneDetails select pn.PhoneNumber).ToList()
            };
            return Ok( pd);
        }

       
        // POST: api/PersonDetails
        [HttpPost]
        public async Task<IActionResult> PostPersonDetail([FromBody] PersonDetail personDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DatabaseModel.PersonDetail dbPD = new DatabaseModel.PersonDetail() {

                FirstName = personDetail.FirstName,
                LastName = personDetail.LastName
            };
            if(personDetail.Id > 0)
            {
                //this is update
                dbPD = await _context.PersonDetails.Include(p=>p.PhoneDetails).FirstOrDefaultAsync(p=>p.PersonId == personDetail.Id);
                if (dbPD == null)
                {
                    return NotFound();
                }
                //update data
                if (!dbPD.FirstName.Equals(personDetail.FirstName))
                {
                    dbPD.FirstName = personDetail.FirstName;
                }
                if (!dbPD.LastName.Equals(personDetail.LastName))
                {
                    dbPD.LastName = personDetail.LastName;
                }
               
                //list of deleted phone
                var deletedPd = dbPD.PhoneDetails.Where(p => !personDetail.PhoneNumbers.Contains(p.PhoneNumber)).ToList();
                //list of added phone
                var phs = (from pd in dbPD.PhoneDetails select pd.PhoneNumber).ToList();
                var addedPn =  personDetail.PhoneNumbers.Where(p => !phs.Contains(p));
                var addedPd = (from p in addedPn select new DatabaseModel.PhoneDetail() {                    
                      PhoneNumber = p
                }).ToList();
                if(deletedPd != null && deletedPd.Count() > 0)
                    _context.PhoneDetails.RemoveRange(deletedPd);
                if(addedPd != null && addedPd.Count() > 0)
                    await _context.PhoneDetails.AddRangeAsync(addedPd);
            

            }
            else
            {
                //this is new
                _context.PersonDetails.Add(dbPD);
                foreach(var item in personDetail.PhoneNumbers)
                {
                    //TODO-validate each phone number before storing
                    _context.PhoneDetails.Add(new DatabaseModel.PhoneDetail() { PersonDetail = dbPD, PhoneNumber = item });
                };
               
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/PersonDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personDetail = await _context.PersonDetails.Include(p => p.PhoneDetails).FirstOrDefaultAsync(p => p.PersonId == id);

            
            if (personDetail == null)
            {
                return NotFound();
            }

            _context.PersonDetails.Remove(personDetail);
            await _context.SaveChangesAsync();

            return Ok(personDetail);
        }

        private bool PersonDetailExists(int id)
        {
            return _context.PersonDetails.Any(e => e.PersonId == id);
        }
    }
}