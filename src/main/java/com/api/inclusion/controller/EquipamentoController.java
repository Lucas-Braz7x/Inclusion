package com.api.inclusion.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.inclusion.model.Doadores;
import com.api.inclusion.model.Equipamentos;

import com.api.inclusion.repository.EquipamentosRepository;
import com.api.inclusion.service.ImgurService;
import com.api.inclusion.service.JwtService;

import io.jsonwebtoken.Claims;


@RestController
@RequestMapping(value="/equipamento")
public class EquipamentoController {

	/* ALTERNATIVA PRO @AUTOWIRED
	 * public DoadorController(DoadorRepository DoadorRepository) {
		this.DoadorRepository = DoadorRepository;
	}
	*/
	@Autowired
	private EquipamentosRepository equipamentosRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private ImgurService imgurService;

	
	//Selecionar/ler
	@GetMapping
	public List<Equipamentos> equipamento() {
		List<Equipamentos> equipamento = equipamentosRepository.findAll();
		if(equipamento.isEmpty()) {
			throw new Error("Não há equipamentos cadastrados");
		}else {
			return equipamento;			
		}
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Equipamentos> FindByIdUser(@PathVariable Long id){
		Optional<Equipamentos> equipamento = equipamentosRepository.findById(id);
		if(equipamento.isPresent()) {
			return new ResponseEntity<Equipamentos>(equipamento.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	//Cadastro
	@PostMapping("/cadastro")
	public Equipamentos salvarEquipamento(@RequestBody @Validated Equipamentos equipamento, 
			@RequestHeader("Authorization") String authorizationToken,
			MultipartFile file) {
		String token = authorizationToken.split(" ")[1];
		Claims doadorToken = jwtService.obterClaims(token);
		
		Doadores doador = new Doadores();
		
		preencherInformacaoDoador(doadorToken, doador);
	
		try {
			equipamento.setDoador(doador);
			return equipamentosRepository.save(equipamento);
		}catch(Exception Error) {
			throw new Error("Não foi possível cadastrar o equipamento");
		}
	}
	
	
	
	
	//Atualização
	@PatchMapping(value="{id}")
	public Equipamentos autualizarEquipamento(
			@PathVariable Long id, 
			@RequestBody @Validated Equipamentos equipamento,
			@RequestHeader("Authorization") String authorizationToken) {
		
		String token = authorizationToken.split(" ")[1];
		Claims doadorToken = jwtService.obterClaims(token);
		
		Doadores doador = new Doadores();
		
		preencherInformacaoDoador(doadorToken, doador);
		
		boolean existEquipamento = equipamentosRepository.existsById(id);
		
		
		if(existEquipamento) {
	
			equipamento.setDoador(doador);
			equipamento.setId(id);
			return equipamentosRepository.saveAndFlush(equipamento);				
			
		}else {
			throw new Error("Id informado não foi encontrado na base de dados");
			
		}
	}
	
	//Deletar
	@DeleteMapping(value ="{id}")
	public void deletarDoador(@PathVariable Long id, 
			@RequestHeader("Authorization") String authorizationToken) {
		Optional<Equipamentos> equipamento = equipamentosRepository.findById(id);
		
		String token = authorizationToken.split(" ")[1];
		Claims doadorToken = jwtService.obterClaims(token);
		
		System.out.println("Claim " + doadorToken.get("id"));
		
		Long doadorTokenId = Long.parseLong(doadorToken.get("id").toString());
		
		if(equipamento.isPresent() && equipamento.get().getDoador().getId() == doadorTokenId) {
			System.out.println("Deletou");
			equipamentosRepository.deleteById(id);
			
		}else {
			throw new Error("O Id informado não tem acesso para excluir o id desejado");
		}
	}
	
	/*
	 * Métodos
	 * */
	public void preencherInformacaoDoador(Claims doadorToken, Doadores doador) {
		Long doadorId = Long.parseLong(doadorToken.get("id").toString());
		String nomeDoador = doadorToken.get("nome").toString();
		String email = doadorToken.get("email").toString();
		String cep = doadorToken.get("cep").toString();
		String estado = doadorToken.get("estado").toString();
		String telefone = doadorToken.get("telefone").toString();
		String endereco = doadorToken.get("endereco").toString();
		
		doador.setId(doadorId);
		doador.setNomeDoador(nomeDoador);
		doador.setEmail(email);
		doador.setCep(cep);
		doador.setEstado(estado);
		doador.setTelefone(telefone);
		doador.setEndereco(endereco);
		doador.setRole("USER");
	}
	
	
	
	
	
}
