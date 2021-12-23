using System.ComponentModel.DataAnnotations;

namespace Inclusion.Models
{
  public abstract class Dados
  {
    [Required]
    public string email { get; set; }

    [Required]
    public string telefone { get; set; }

    [Required]
    [Display(Name = "endereço")]
    public string endereco { get; set; }

    [Required]
    public string estado { get; set; }

    [Required]
    public string senha { get; set; }

  }
}