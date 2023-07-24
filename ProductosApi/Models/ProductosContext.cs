using Microsoft.EntityFrameworkCore;

namespace ProductosApi.Models;

public class ProductosContext : DbContext
{
    public ProductosContext(DbContextOptions<ProductosContext> options)
        : base(options)
    {
    }

    public DbSet<ProductosItem> ProductosItems { get; set; } = null!;
}