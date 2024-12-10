// Controllers/TripsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
[ApiController]
[Route("api/[controller]")]
public class TripsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TripsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Trip>> CreateTrip([FromBody] CreateTripRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.UserEmail);
        if (user == null)
        {
            user = new User { Email = request.UserEmail };
            _context.Users.Add(user);
        }

        var trip = new Trip
        {
            UserId = user.Id,
            Location = request.UserSelection.Location.Label,
            TotalDays = int.Parse(request.UserSelection.NoOfDays),
            BudgetCategory = request.UserSelection.Budget,
            TravelersCategory = request.UserSelection.Traveler,
            TravelersCount = int.Parse(request.UserSelection.Traveler.Split(' ')[0])
        };

        trip.RawData = new TripRawData
        {
            UserSelection = JsonDocument.Parse(JsonSerializer.Serialize(request.UserSelection)),
            TripData = JsonDocument.Parse(JsonSerializer.Serialize(request.TripData))
        };

        _context.Trips.Add(trip);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Trip>> GetTrip(string id)
    {
        var trip = await _context.Trips
            .Include(t => t.RawData)
            .FirstOrDefaultAsync(t => t.Id == id);

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
            .Include(t => t.RawData)
            .Where(t => t.User.Email == email)
            .ToListAsync();
    }
}