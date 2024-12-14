using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Data;
using TripPlanner.API.Models;

namespace TripPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly TripPlannerContext _context;

        public TripsController(TripPlannerContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Trip>> CreateTrip(Trip trip)
        {
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTrip(Guid id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null)
            {
                return NotFound();
            }
            return trip;
        }

        [HttpGet("user/{email}")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetUserTrips(string email)
        {
            return await _context.Trips
                .Where(t => t.UserEmail == email)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
    }
}