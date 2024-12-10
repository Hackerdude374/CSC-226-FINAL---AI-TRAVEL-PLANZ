using System.Text.Json;

public class TripRawData
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string TripId { get; set; }
    public JsonDocument UserSelection { get; set; }
    public JsonDocument TripData { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Trip Trip { get; set; }
}