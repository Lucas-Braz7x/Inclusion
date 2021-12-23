using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inclusion.Models
{
  public class Doador : Dados
  {
    [Key]
    [Column(Order = 1)]

    public int id { get; set; }

    [Required]
    [Display(Name = "nome")]
    public string nomeDoador { get; set; }

    [Required]
    public int idade { get; set; }

  }
}