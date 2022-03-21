package com.api.inclusion.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ProxySelector;
import java.net.http.HttpResponse;
import java.nio.file.Path;
import java.text.ParseException;

import javax.annotation.Resource;
import javax.servlet.annotation.MultipartConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.api.inclusion.model.Doadores;
import com.api.inclusion.repository.DoadorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import antlr.collections.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@MultipartConfig
@RestController
@RequestMapping(value="image")
public class ImgurService {
 
    //private final String ENDPOINT  = "https://api.imgur.com/3/upload/json";
    private final String ENDPOINT  = "https://api.imgur.com/3/image";
    private final String CLIENT_ID = "a532c7c687b17fd";
    private static final HttpHeaders headers = new HttpHeaders();
    private static LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    private static HttpEntity<LinkedMultiValueMap<String, Object>> httpRequestEntity;
    private static ResponseImgur responseImgur;
    
    @Autowired
    DoadorRepository doadorRepository;  
    
    public ResponseEntity<String[]> receiveData(MultipartFile file) {
 
    	if(!file.isEmpty()) {
    		try {
    			ResponseEntity<String[]> imageResponse = saveImage(file);
    			return imageResponse;
    		}catch(Error e){
    			String[] error ={"Error ao subir arquivo", e.getMessage()};
    			return new ResponseEntity<String[]>(error, HttpStatus.BAD_REQUEST);
    		}
    	}else {
    		return new ResponseEntity<String[]>(HttpStatus.BAD_REQUEST);
    	}
       
    }
    
    @PostMapping
    public ResponseEntity<String[]> saveImage(MultipartFile file) {
    	System.out.println(file.getOriginalFilename());
        
        String[] imageData = new String[2];
    	

    	try {
    		if(!file.isEmpty()) {
    			ByteArrayInputStream arrayInputStream = new ByteArrayInputStream(file.getBytes()); 
    			System.out.println("Array:" + arrayInputStream);
    			ByteArrayResource resource = new ByteArrayResource(file.getBytes(), file.getOriginalFilename());
    			InputStream inputStream = file.getInputStream();
    			InputStreamResource inputStreamResource = new InputStreamResource(arrayInputStream, file.getOriginalFilename());
    			System.out.println("Inpustream TESTE : " + file.getInputStream());
    			    		
		    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		    	headers.set("Authorization", "Client-ID " +CLIENT_ID);
		    	body.add("image",resource);
		    	
		    	System.out.println("InputStream" + file.getInputStream());
		    	httpRequestEntity = new HttpEntity<>(body, headers);
		    	responseImgur = new RestTemplate().postForObject(ENDPOINT, httpRequestEntity, ResponseImgur.class);
		    	
		    	System.out.println(responseImgur);
		    	
		    	imageData[0] = responseImgur.data.link;
		    	imageData[1] = responseImgur.data.deletehash;
    			
		    	System.out.println(imageData[0]);
		    	inputStream.close();
		    	return new ResponseEntity<String[]>(imageData, HttpStatus.OK);
    		}else {
    			throw new Error("Arquivo não subiu");
    		}
    	}catch(IOException e){
    		imageData[0] = "Error";
    		imageData[1] = imageData[0];
    		System.out.println("Error: " + e.getMessage() );
    		return new ResponseEntity<String[]>(imageData, HttpStatus.BAD_REQUEST);
    	}

    }
}
 