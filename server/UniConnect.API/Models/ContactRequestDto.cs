using System.ComponentModel.DataAnnotations;

namespace UniConnect.API.Models;

public class ContactRequestDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string? Notes { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}