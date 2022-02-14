using System.ComponentModel.DataAnnotations;

namespace Inclusion.Models
{
  public abstract class Dados
  {
    [StringLength(60, MinimumLength = 7)]
    [Required]
    public string? email { get; set; }

    [RegularExpression(@"^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$")]
    [Required]
    [StringLength(20)]
    public string? telefone { get; set; }

    [Required]
    [Display(Name = "endereço")]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "O endereço deve conter entre 5 e 100 caracteres.")]
    public string endereco { get; set; }

    [Required]
    [StringLength(2, MinimumLength = 2, ErrorMessage = "O estado deve conter 2 caracteres.")]
    public string estado { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8, ErrorMessage = "O nome do equipamento deve conter entre 5 e 50 caracteres.")]
    public string senha { get; set; }

  }
}
