package com.gogo.gogo.controller.admin;



import com.gogo.gogo.model.dto.LoginRequest;
import com.gogo.gogo.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/auth/admin")
public class AdminUserController {
    private final AccountService userAdminService;


    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest loginRequest){
        log.debug("REST Request to login : {}",loginRequest);

        return userAdminService.login(loginRequest);
    }


}
