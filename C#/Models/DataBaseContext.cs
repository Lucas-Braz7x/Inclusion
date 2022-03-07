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
      optionsBuilder.UseSqlServer(connectionString: "workstation id=inclusion.mssql.somee.com;packet size=4096;user id=Lucas-Braz_SQLLogin_1;pwd=lwm9wb2m9a;data source=inclusion.mssql.somee.com;persist security info=False;initial catalog=inclusion");
    }
  }
}