using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inclusion.Models
{
  public class Doador
  {
    [Key]
    [Column(Order = 1)]

    public int id { get; set; }

    [Required]
    public string nome { get; set; }

    [Required]
    public string email { get; set; }

    [Required]
    public int idade { get; set; }

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