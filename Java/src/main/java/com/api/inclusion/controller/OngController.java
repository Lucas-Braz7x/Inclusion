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
import com.api.inclusion.model.Ongs;
import com.api.inclusion.repository.DoadorRepository;
import com.api.inclusion.repository.OngsRepository;
import com.api.inclusion.security.JwtSecurity;
import com.api.inclusion.security.Token;
import com.api.inclusion.service.JwtService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping(value="/ong")
public class OngController {
	
	@Autowired
	private OngsRepository ongsRepository;
	
	@Autowired
	private DoadorRepository doadorRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired 
	private PasswordEncoder encoder;
	
	@GetMapping
	public List<Ongs> doador() {
		List<Ongs> ongs = ongsRepository.findAll();
		if(ongs.isEmpty()) {
			throw new Error("Não há ONGs cadastrados");
		}
		return ongsRepository.findAll();
	}
	
	@PatchMapping("/atualizar")
	public String atualizarSenha(@RequestBody Ongs ong) {
		
		boolean existOng = ongsRepository.existsByEmail(ong.getEmail());
		
		if(existOng) {
			try {
				Optional<Ongs> ongBanco = ongsRepository.findByEmail(ong.getEmail());
				Ongs ongAtual = ongsRepository.getById(ongBanco.get().getId());
				String senhaCodificada = encoder.encode(ong.getSenha());
				ongAtual.setSenha(senhaCodificada);
				ongsRepository.saveAndFlush(ongAtual);
				
				return "Senha atualizada";
				
			}catch (Exception e) {
				throw new Error("ERROR: " + e.getMessage());
			}
		}else {
			throw new Error("Usuário não encontrado, informe outro email");
		}
	}
	
	
	//Cadastro
	@PostMapping("/cadastro")
	public Ongs salvarOng(@RequestBody @Validated Ongs ong) {
		
		boolean exist = ongsRepository.existsByEmail(ong.getEmail());
		boolean existEmailDoador = doadorRepository.existsByEmail(ong.getEmail());
		System.out.println(ong.getEmail() + " -  " + exist);
		if(exist || existEmailDoador) {
			throw new Error("Email já cadastrado");
		}
		cripoSenha(ong);
		ong.setRole("ONG");
		return ongsRepository.save(ong);
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Ongs> encontrarPorId(@PathVariable Long id){
		Optional<Ongs> ong = ongsRepository.findById(id);
		if(ong.isPresent()) {
			return new ResponseEntity<Ongs>(ong.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	//Atualização
	@PatchMapping(value="/{id}")
	public Ongs autualizarOng(@PathVariable Long id, @RequestBody Ongs ong) {
				
		boolean existOng = ongsRepository.existsById(id);
		if(existOng) {
			Ongs ongExistente = ongsRepository.getById(id);
			
			if(ong.getNomeOng() != null && ong.getNomeOng() != "") {
				ongExistente.setNomeOng(ong.getNomeOng());
			}
			if(ong.getEmail() != null && ong.getEmail() != "") {
				ongExistente.setEmail(ong.getEmail());
			}
			if(ong.getTelefone() != null && ong.getTelefone() != "") {
				ongExistente.setTelefone(ong.getTelefone());
			}
			if(ong.getCnpj() != null && ong.getCnpj() != "") {
				ongExistente.setCnpj(ong.getCnpj());
			}
			if(ong.getEndereco() != null && ong.getEndereco() != "") {
				ongExistente.setEndereco(ong.getEndereco());
			}
			if(ong.getCep() != null && ong.getCep() != "") {
				ongExistente.setCep(ong.getCep());
			}
			if(ong.getEndereco() != null && ong.getEndereco() != "") {
				ongExistente.setEndereco(ong.getEndereco());
			}
			if(ong.getEstado() != null && ong.getEstado() != "") {
				ongExistente.setEstado(ong.getEstado());
			}
			if(ong.getSenha() != null && ong.getSenha() != "") {
				cripoSenha(ong);
				ongExistente.setSenha(ong.getSenha());
			}
			return ongsRepository.saveAndFlush(ongExistente);
			
		}else {
			throw new Error("Id informado não foi encontrado na base de dados");
			
		}
	}	
	
	//Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Ongs ong) {
		try {
			Ongs ongAutenticado = autenticarOng(
					ong.getEmail(),
					ong.getSenha());
			String tokenDoador = jwtService.gerarToken(ongAutenticado);
			Token tokendoadorAutenticado = new Token(
					ongAutenticado.getNomeOng(),
					tokenDoador);
			return ResponseEntity.ok(tokenDoador);
		}catch(ErrorAuth e){
			System.out.println(e.getMessage());
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	@DeleteMapping(value ="{id}")
	public void deletarOng(@PathVariable Long id, @RequestHeader("Authorization") String authorizationToken) {
		Optional<Ongs> ong = ongsRepository.findById(id);
		
		String token = authorizationToken.split(" ")[1];
		
		if(ong.isPresent() && validarId(token, id)) {
			ongsRepository.deleteById(id);
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
	public void cripoSenha(Ongs ong) {
		String senha = ong.getSenha();
		String senhaCodificada = encoder.encode(senha);
		ong.setSenha(senhaCodificada);
	}
	
	//Verificar existência do usuário no banco de dados
	public Ongs autenticarOng(String email, String senha) {
		Optional<Ongs> ong = ongsRepository.findByEmail(email);
		if(!ong.isPresent()) {
			throw new ErrorAuth("Usuário não encontrado, informe outro email");
		}
		
		//Compara as senhas
		//Primeira entrada a senha recebida, segunda a senha no banco de dados
		boolean senhaIsEquals = encoder.matches(senha, ong.get().getSenha());
		
		if(!senhaIsEquals) {
			throw new ErrorAuth("Senha inválida");
		}
		return ong.get();
	}
	
	
	
}
