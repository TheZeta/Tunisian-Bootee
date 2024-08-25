// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using TunisianBootie.Api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure any specific model behavior here if necessary
    }
}
