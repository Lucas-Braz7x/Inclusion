using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inclusion.Models
{
  public class Ong : Dados
  {
    [Key]
    [Column(Order = 1)]

    public int id { get; set; }
    
    [StringLength(60, MinimumLength = 7)]
    [Required]
    public string email { get; set; }

    [RegularExpression(@"^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$")]
    [Required]
    [StringLength(20)]
    public string telefone { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 5, ErrorMessage = "O nome da ONG deve conter entre 5 e 50 caracteres.")]
    public string nomeOng { get; set; }

  }
}
