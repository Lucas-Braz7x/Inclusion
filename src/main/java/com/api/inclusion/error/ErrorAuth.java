package com.api.inclusion.error;

public class ErrorAuth extends RuntimeException {
	public ErrorAuth(String errorMessage) {
		super(errorMessage);
		
	}
}
