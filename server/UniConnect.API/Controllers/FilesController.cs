using Microsoft.AspNetCore.Mvc;
using UniConnect.API.Models;

namespace UniConnect.API.Controllers;

[ApiController]
[Route("api/files")]
public class FilesController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public FilesController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<FileUploadResponseDto>>> Upload(IFormFile? file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(OperationResult<FileUploadResponseDto>.Fail("No file provided."));

        var uploadDir = Path.Combine(_env.ContentRootPath, "uploads");
        Directory.CreateDirectory(uploadDir);

        var safeFileName = $"{Guid.NewGuid():N}_{Path.GetFileName(file.FileName)}";
        var filePath = Path.Combine(uploadDir, safeFileName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var result = new FileUploadResponseDto
        {
            FileName = file.FileName,
            ContentType = file.ContentType,
            Size = file.Length,
            StoragePath = safeFileName,
            UploadedAt = DateTime.UtcNow
        };

        return Ok(OperationResult<FileUploadResponseDto>.Ok(result, "File uploaded successfully."));
    }
}