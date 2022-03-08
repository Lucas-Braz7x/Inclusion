package com.api.inclusion.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
	public Doadores salvarDoador(@RequestBody Doadores doador) {
		
		boolean exist = doadorRepository.existsByEmail(doador.getEmail());
		System.out.println(doador.getEmail() + " -  " + exist);
		if(exist) {
			throw new Error("Email já cadastrado");
		}
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
	@PutMapping(value="{id}")
	public Doadores autualizarDoador(@PathVariable Long id, @RequestBody Doadores doador) {
		
		boolean existDoador = doadorRepository.existsById(id);
		System.out.println(doador.getEmail() + " -  " + existDoador);
		
		if(existDoador) {
			cripoSenha(doador);
			return doadorRepository.saveAndFlush(doador);
			
		}else {
			throw new Error("Id informado não foi encontrado na base de dados");
			
		}
	}	
	
	//Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Doadores doador) {
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
