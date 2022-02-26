package com.api.inclusion.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DoadorController {

	@GetMapping("/")
	public String Home() {
		return "Home page";
	}
	
	@GetMapping("/usuario")
	public String usuario() {
		return "Usuario page";
	}
	
	@PostMapping("/usuario/login")
	public String login() {
		return "login page";
	}
}
