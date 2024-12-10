public class Trip
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string UserId { get; set; }
    public string Location { get; set; }
    public int TotalDays { get; set; }
    public string BudgetCategory { get; set; }
    public string TravelersCategory { get; set; }
    public int TravelersCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "active";

    public User User { get; set; }
    public TripRawData RawData { get; set; }
}
