using Microsoft.AspNetCore.Mvc;
using UniConnect.API.Models;

namespace UniConnect.API.Controllers;

[Route("api/files")]
public class FilesController : BaseController
{
    private readonly IWebHostEnvironment _environment;

    public FilesController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<FileUploadResponseDto>>> Upload([FromForm] IFormFile? file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(OperationResult<FileUploadResponseDto>.Fail("No file provided."));
        }

        var uploadDir = Path.Combine(_environment.ContentRootPath, "uploads");
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
