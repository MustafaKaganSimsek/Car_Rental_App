package com.gogo.gogo.auth;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

@AllArgsConstructor
@Setter
@Getter
@Builder
public class UserSecurityInfo {
    private String email;
    private String name;
    private Long id;
    @Value("${questapp.expires.in}")
    private Long expiresIn ;
    private String token;
}
