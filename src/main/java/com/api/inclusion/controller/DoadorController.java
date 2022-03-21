package com.api.inclusion.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import com.api.inclusion.error.ErrorAuth;
import com.api.inclusion.model.Doadores;
import com.api.inclusion.repository.DoadorRepository;
import com.api.inclusion.security.Token;
import com.api.inclusion.service.JwtService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(value="/doador")
public class DoadorController {

	/* ALTERNATIVA PRO @AUTOWIRED
	 * public DoadorController(DoadorRepository DoadorRepository) {
		this.DoadorRepository = DoadorRepository;
	}
	*/
	@Autowired
	private DoadorRepository doadorRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired 
	private PasswordEncoder encoder;
	
	@GetMapping
	public List<Doadores> doador() {
		List<Doadores> doadores = doadorRepository.findAll();
		if(doadores.isEmpty()) {
			throw new Error("Não há doadores cadastrados");
		}
		return doadorRepository.findAll();
	}
	
	//Cadastro
	@PostMapping("/cadastro")
	public Doadores salvarDoador(@RequestBody @Validated Doadores doador) {
		
		boolean exist = doadorRepository.existsByEmail(doador.getEmail());
		System.out.println(doador.getEmail() + " -  " + exist);
		if(exist) {
			throw new Error("Email já cadastrado");
		}
		doador.setRole("USER");
		cripoSenha(doador);
		return doadorRepository.save(doador);
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Doadores> FindByIdUser(@PathVariable Long id){
		Optional<Doadores> doador = doadorRepository.findById(id);
		if(doador.isPresent()) {
			return new ResponseEntity<Doadores>(doador.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	//Atualização
	@PatchMapping(value="{id}")
	public Doadores autualizarDoador(@PathVariable Long id, 
									@RequestBody Doadores doador,
									@RequestHeader("Authorization") String authorizationToken) {
		boolean existDoador = doadorRepository.existsById(id);
		
		if(existDoador) {
			String token = authorizationToken.split(" ")[1];
			Doadores doadorExistente = doadorRepository.getOne(id);
			System.out.println(doadorExistente.getEmail());
			System.out.println(doadorExistente.getNomeDoador());
			System.out.println(doadorExistente.getEndereco());
			System.out.println(doadorExistente.getTelefone());
			if(validarId(token, doadorExistente.getId())) {
				if(doador.getEmail() != null) {
					if(!doadorRepository.existsByEmail(doador.getEmail())) {
						doadorExistente.setEmail(doador.getEmail());
					}else {
						throw new Error("Email já cadastrado");	
					}					
				}
				
				if(doador.getNomeDoador() != null) {
					doadorExistente.setNomeDoador(doador.getNomeDoador());
				}
				if(doador.getSenha() != null && doador.getSenha().length() >= 8) {
					cripoSenha(doador);
					doadorExistente.setSenha(doador.getSenha());
				}
				if(doador.getCep() != null) {
					doadorExistente.setCep(doador.getCep());
				}
				if(doador.getEndereco() != null) {
					doadorExistente.setEndereco(doador.getEndereco());
				}
				if(doador.getEstado() != null) {
					doadorExistente.setEstado(doador.getEstado());
				}
				if(doador.getTelefone() != null) {
					doadorExistente.setTelefone(doador.getTelefone());
				}
				/*if(doador.() != null) {
					doadorExistente.setTelefone(doador.getTelefone());
				}*/
				
			}else {
				throw new Error("Não foi possível atualizar, IDs diferentes");	
			}
			return doadorRepository.saveAndFlush(doadorExistente);
			
		}else {
			throw new Error("Id informado não foi encontrado na base de dados");
			
		}
	}	
	
	//Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Validated Doadores doador) {
		try {
			Doadores doadorAutenticado = autenticarDoador(
					doador.getEmail(),
					doador.getSenha());
			String tokenDoador = jwtService.gerarToken(doadorAutenticado);
			Token tokendoadorAutenticado = new Token(
					doadorAutenticado.getNomeDoador(),
					tokenDoador);
			return ResponseEntity.ok(tokenDoador);
		}catch(ErrorAuth e){
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	//Excluir
	@DeleteMapping(value ="{id}")
	public void deletarDoador(@PathVariable Long id, @RequestHeader("Authorization") String authorizationToken) {
		Optional<Doadores> doador = doadorRepository.findById(id);
		
		String token = authorizationToken.split(" ")[1];
		
		if(doador.isPresent() && validarId(token, id)) {
			doadorRepository.deleteById(id);
		}else {
			throw new Error("O Id informado não tem acesso para excluir o id desejado");
		}
	}
	
	
	
	//MÉTODOS
	/*
	 * 
	 * 
	 * 
	 */
	//Validar id informado
	public boolean validarId(String token, Long id) {
		Claims doadorToken = jwtService.obterClaims(token);
		Long doadorTokenId = Long.parseLong(doadorToken.get("id").toString());
		
		if( doadorTokenId == id) {
			return true;
		}
		
		return false;
	}
	
	//criptografar senha
	public void cripoSenha(Doadores doador) {
		String senha = doador.getSenha();
		String senhaCodificada = encoder.encode(senha);
		doador.setSenha(senhaCodificada);
	}
	
	//Verificar existência do usuário no banco de dados
	public Doadores autenticarDoador(String email, String senha) {
		Optional<Doadores> doador = doadorRepository.findByEmail(email);
		if(!doador.isPresent()) {
			throw new ErrorAuth("Usuário não encontrado, informe outro email");
		}
		
		//Compara as senhas
		//Primeira entrada a senha recebida, segunda a senha no banco de dados
		boolean senhaIsEquals = encoder.matches(senha, doador.get().getSenha());
		
		if(!senhaIsEquals) {
			throw new ErrorAuth("Senha inválida");
		}
		return doador.get();
	}
	
}
