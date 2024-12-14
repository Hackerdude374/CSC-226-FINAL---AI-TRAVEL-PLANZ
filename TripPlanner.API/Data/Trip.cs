using System.Text.Json;

namespace TripPlanner.API.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public JsonDocument UserSelection { get; set; } = null!;
        public JsonDocument TripData { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}