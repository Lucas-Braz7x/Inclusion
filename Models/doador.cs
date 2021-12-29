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
    [StringLength(50, MinimumLength = 5, ErrorMessage = "O nome do doador deve conter entre 5 e 50 caracteres.")]
    public string nomeDoador { get; set; }

    [Required]
    public int idade { get; set; }

  }
}