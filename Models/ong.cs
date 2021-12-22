using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inclusion.Models
{
  public class Ong : Dados
  {
    [Key]
    [Column(Order = 1)]

    public int id { get; set; }

    [Required]
    public string nomeOng { get; set; }

  }
}