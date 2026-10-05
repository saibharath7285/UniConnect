using System.Collections.Concurrent;
using Microsoft.AspNetCore.Mvc;
using UniConnect.API.Models;

namespace UniConnect.API.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private static readonly ConcurrentBag<ContactRequestDto> Requests = new();

    [HttpPost]
    public ActionResult<OperationResult<ContactRequestDto>> Create([FromBody] ContactRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(OperationResult<ContactRequestDto>.Fail("Invalid form data."));

        dto.SubmittedAt = DateTime.UtcNow;
        Requests.Add(dto);
        return Ok(OperationResult<ContactRequestDto>.Ok(dto, "Contact request received successfully."));
    }

    [HttpGet]
    public ActionResult<OperationResult<IEnumerable<ContactRequestDto>>> List()
    {
        return Ok(OperationResult<IEnumerable<ContactRequestDto>>.Ok(Requests.ToArray()));
    }
}