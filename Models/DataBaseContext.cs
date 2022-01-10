using Microsoft.EntityFrameworkCore;

namespace Inclusion.Models
{
  public class DataBaseContext : DbContext
  {
    public DbSet<Doador> Doadores { get; set; }
    public DbSet<Ong> Ongs { get; set; }
    public DbSet<Equipamento> Equipamentos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      /*optionsBuilder.UseSqlServer(connectionString: "Data Source=DESKTOP-3PLJOV1;Initial Catalog=inclusion; Integrated Security=true;");*/
      optionsBuilder.UseSqlServer(connectionString: "Server=tcp:inclusiondb.database.windows.net,1433;Initial Catalog=Inclusion;Persist Security Info=False;User ID=Inclusion;Password=Squad42!@#;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
    }
  }
}