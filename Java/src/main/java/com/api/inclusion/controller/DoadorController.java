package com.api.inclusion.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.inclusion.error.ErrorAuth;
import com.api.inclusion.model.Doadores;
import com.api.inclusion.repository.DoadorRepository;
import com.api.inclusion.security.Token;
import com.api.inclusion.service.JwtService;

@RestController
public class DoadorController {

	/* ALTERNATIVA PRO @AUTOWIRED
	 * public UsuarioController(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	*/
	@Autowired
	private DoadorRepository doadorRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired 
	private PasswordEncoder encoder;
	
	@GetMapping("/")
	public String Home() {
		return "Home page";
	}
	
	@GetMapping("/doador")
	public String doador() {
		return "Usuario autenticado";
	}
	
	@PostMapping("/doador/cadastro")
	public Doadores salvarDoador(@RequestBody Doadores doador) {
		
		boolean exist = doadorRepository.existsByEmail(doador.getEmail());
		System.out.println(doador.getEmail() + " -  " + exist);
		if(exist) {
			throw new Error("Email já cadastrado");
		}
		cripoSenha(doador);
		return doadorRepository.save(doador);
	}
	
	public void cripoSenha(Doadores doador) {
		String senha = doador.getSenha();
		String senhaCodificada = encoder.encode(senha);
		doador.setSenha(senhaCodificada);
	}
	
	
	@PostMapping("/doador/login")
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
	
	public Doadores autenticarDoador(String email, String senha) {
		Optional<Doadores> doador = doadorRepository.findByEmail(email);
		if(!doador.isPresent()) {
			throw new ErrorAuth("Usuário não encontrado");
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
