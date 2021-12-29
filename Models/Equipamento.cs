using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inclusion.Models
{
  public class Equipamento
  {
    [Key]
    [Column(Order = 1)]
    public int id { get; set; }

    [Required]
    [Display(Name = "nome")]
    [StringLength(50, MinimumLength = 5, ErrorMessage = "O nome do equipamento deve conter entre 5 e 50 caracteres.")]
    public string nomeEquipamento { get; set; }

    [Required]
    [Display(Name = "descrição")]
    [StringLength(200, MinimumLength = 5, ErrorMessage = "A descrição deve conter entre 5 e 200 caracteres.")]
    public string descricao { get; set; }

    [StringLength(200, MinimumLength = 5, ErrorMessage = "A url da imagem deve conter entre 5 e 200 caracteres.")]
    public string imgUrl { get; set; }


    [Required(ErrorMessage = "Campo obrigatório")]
    public int doadorId { get; set; }
    public Doador doador { get; set; }

  }
}