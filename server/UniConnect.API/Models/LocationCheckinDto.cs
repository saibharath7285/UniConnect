namespace UniConnect.API.Models;

public class LocationCheckinDto
{
    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public double? Altitude { get; set; }

    public double? Accuracy { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
