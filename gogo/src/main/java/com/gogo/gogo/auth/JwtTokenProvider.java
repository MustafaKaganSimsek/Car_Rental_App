package com.gogo.gogo.auth;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${questapp.app.secret}")
    private String APP_SECRET ;

    @Value("${questapp.expires.in}")
    private Long EXPIRES_IN ;

    public String generateJwtToken(Authentication auth){
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Date expireDate = new Date(new Date().getTime()+EXPIRES_IN);
        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getAccount().getId()))
                .claim("name",userDetails.getAccount().getName())
                .claim("email",userDetails.getAccount().getEmail())
                .claim("role",userDetails.getAccount().getRole())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512,APP_SECRET)
                .compact();
    }

    Long getUserIdFromJwt(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(APP_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
            return !isTokenExpired(token);
        }catch (SignatureException e){
            return false;
        }catch (MalformedJwtException e){
            return false;
        }catch (ExpiredJwtException e){
            return false;
        }catch (IllegalArgumentException e){
            return false;
        }catch (UnsupportedJwtException e){
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expretion = Jwts.parser()
                .setSigningKey(APP_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expretion.before(new Date());
    }
}
