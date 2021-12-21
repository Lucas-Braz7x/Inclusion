using Microsoft.EntityFrameworkCore;

namespace Inclusion.Models
{
  public class DataBaseContext : DbContext
  {
    public DbSet<Doador> Doadores { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(connectionString: "Data Source=DESKTOP-3PLJOV1;Initial Catalog=Inclusion; Integrated Security=true;");
    }
  }
}