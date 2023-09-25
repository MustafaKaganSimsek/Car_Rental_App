package com.gogo.gogo.controller;

import com.gogo.gogo.model.Account;
import com.gogo.gogo.model.converter.AccountConverter;
import com.gogo.gogo.model.dto.AccountDto;
import com.gogo.gogo.model.dto.LoginRequest;
import com.gogo.gogo.model.dto.RegisterRequest;
import com.gogo.gogo.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Log4j2
@RestController
@AllArgsConstructor
@RequestMapping("/auth/user")
public class UserController {

    private final AccountService accountService;

    private final AccountConverter converter;

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest loginRequest){

        log.debug("REST Request to login : {}",loginRequest);

        return accountService.login(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<AccountDto> register(@Valid @RequestBody RegisterRequest registerRequest){
        log.debug("REST Request to register for User: {}",registerRequest);

        return ResponseEntity.ok(converter.convertToDto(accountService.registerForUser(registerRequest)))  ;
    }






}
