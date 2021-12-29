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
    [StringLength(50, MinimumLength = 5, ErrorMessage = "O nome da ONG deve conter entre 5 e 50 caracteres.")]
    public string nomeOng { get; set; }

  }
}