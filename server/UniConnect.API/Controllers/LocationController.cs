using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;
using UniConnect.API.Models;

namespace UniConnect.API.Controllers;

[Route("api/location")]
public class LocationController : BaseController
{
    private static readonly ConcurrentBag<LocationCheckinDto> Checkins = new();

    [HttpPost]
    public ActionResult<OperationResult<LocationCheckinDto>> Checkin([FromBody] LocationCheckinDto dto)
    {
        dto.Timestamp = DateTime.UtcNow;
        Checkins.Add(dto);

        return Ok(OperationResult<LocationCheckinDto>.Ok(dto, "Location recorded successfully."));
    }

    [HttpGet]
    public ActionResult<OperationResult<IEnumerable<LocationCheckinDto>>> List()
    {
        return Ok(OperationResult<IEnumerable<LocationCheckinDto>>.Ok(Checkins.ToArray()));
    }
}
