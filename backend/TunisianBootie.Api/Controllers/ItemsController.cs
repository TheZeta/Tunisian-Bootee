using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TunisianBootie.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly string _apiUrl;

    public ItemsController(AppDbContext context, IOptions<ApiSettings> apiSettings)
    {
        _context = context;
        _apiUrl = apiSettings.Value.ApiUrl;
    }

    [HttpPost]
    public async Task<IActionResult> AddItem(
        [FromForm] string name,
        [FromForm] decimal price,
        [FromForm] string size,
        IFormFile imageFile
    )
    {
        if (string.IsNullOrEmpty(name) || price <= 0 || string.IsNullOrEmpty(size))
        {
            return BadRequest("Invalid item data.");
        }

        var item = new Item
        {
            Name = name,
            Price = price,
            Size = size,
        };

        if (imageFile != null && imageFile.Length > 0)
        {
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);
                item.ImageData = memoryStream.ToArray();
                item.ImageMimeType = imageFile.ContentType;
            }
        }

        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllItems()
    {
        // Fetch all items from the database using EF Core
        var items = await _context.Items.ToListAsync();

        // Return the items as a JSON response
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetItem(int id)
    {
        // Fetch the item from the database using EF Core
        var item = await _context.Items.FindAsync(id);

        if (item == null)
        {
            return NotFound(); // Return 404 if the item is not found
        }

        // Optionally, you could use _apiUrl here to interact with another service if needed

        // Return the item as a JSON response
        return Ok(item);
    }

    [HttpGet("{id}/image")]
    public async Task<IActionResult> GetImage(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null || item.ImageData == null)
            return NotFound();

        return File(item.ImageData, item.ImageMimeType);
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage(int itemId, IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("No image uploaded.");

        var item = await _context.Items.FindAsync(itemId);
        if (item == null)
            return NotFound($"Item with the ID {itemId} not found.");

        using (var ms = new MemoryStream())
        {
            await image.CopyToAsync(ms);
            item.ImageData = ms.ToArray();
            item.ImageMimeType = image.ContentType;
        }

        _context.Items.Update(item);
        await _context.SaveChangesAsync();

        return Ok(new { item.Id });
    }
}
