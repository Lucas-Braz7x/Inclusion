using System.ComponentModel.DataAnnotations;

namespace Inclusion.Models
{
  public abstract class Dados
  {
    [Required]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "O email deve conter entre 5 e 100 caracteres.")]
    public string email { get; set; }

    [Required]
    [StringLength(20, MinimumLength = 10, ErrorMessage = "O telefone deve conter entre 5 e 20 caracteres.")]
    public string telefone { get; set; }

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