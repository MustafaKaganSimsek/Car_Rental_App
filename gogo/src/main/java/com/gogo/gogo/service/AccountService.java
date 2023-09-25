package com.gogo.gogo.service;

import com.gogo.gogo.auth.CustomUserDetails;
import com.gogo.gogo.auth.JwtTokenProvider;
import com.gogo.gogo.enums.Role;
import com.gogo.gogo.exception.ExistAccountException;
import com.gogo.gogo.model.Account;
import com.gogo.gogo.model.dto.LoginRequest;
import com.gogo.gogo.model.dto.RegisterRequest;
import com.gogo.gogo.repository.AccountRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Log4j2
@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;


    public Account registerForUser(RegisterRequest registerRequest){
        log.debug("Request to register for User: {}",registerRequest);

        if(accountRepository.existsAccountByEmail(registerRequest.getEmail())){
           throw new ExistAccountException("Account is exist "+ registerRequest.getEmail());
        }
        Account account =  accountRepository.save(Account.builder()
                .role(Role.USER)
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build());
        return account;
    }

    public Account registerForAdmin(RegisterRequest registerRequest){
        log.debug("Request to register for Admin: {}",registerRequest);

        if(accountRepository.existsAccountByEmail(registerRequest.getEmail())){
            new ExistAccountException("Account is exist "+ registerRequest.getEmail());
        }
        Account account =  accountRepository.save(Account.builder()
                .role(Role.ADMIN)
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build());
        accountRepository.save(account);

        return account;
    }

    public String login(LoginRequest loginRequest) {
        log.debug("Request to login : {}",loginRequest);

        UsernamePasswordAuthenticationToken authenticationToken =new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        log.debug("login jwt token: {}",jwtToken);

        return  jwtToken;
    }
    
    static Account getCurrentAccount(){
        log.debug("Request to get current Account");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return userDetails.getAccount();

    }

    @PostConstruct
    public void defaultAdmin(){

        if (!accountRepository.existsAccountByEmail("admin")){
            accountRepository.save(Account.builder()
                    .role(Role.ADMIN)
                    .email("admin")
                    .name("admin")
                    .password(passwordEncoder.encode("admin"))
                    .build());
        }


    }

}
