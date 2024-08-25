using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TunisianBootie.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly string _apiUrl;

    public ProductsController(AppDbContext context, IOptions<ApiSettings> apiSettings)
    {
        _context = context;
        _apiUrl = apiSettings.Value.ApiUrl;
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct(
        [FromForm] string name,
        [FromForm] decimal price,
        [FromForm] string size,
        [FromForm] string imageUrl
    )
    {
        if (string.IsNullOrEmpty(name) || price <= 0 || string.IsNullOrEmpty(size))
        {
            return BadRequest("Invalid product data.");
        }

        var product = new Product
        {
            Name = name,
            Price = price,
            Size = size,
            ImageUrl = imageUrl
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        // Fetch all items from the database using EF Core
        var products = await _context.Products.ToListAsync();

        // Return the items as a JSON response
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        // Fetch the item from the database using EF Core
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound(); // Return 404 if the item is not found
        }

        // Optionally, you could use _apiUrl here to interact with another service if needed

        // Return the item as a JSON response
        return Ok(product);
    }
}
