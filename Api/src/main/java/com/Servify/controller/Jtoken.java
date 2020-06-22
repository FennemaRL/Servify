package com.Servify.controller;

import com.Servify.model.ServiceProviderError;
import io.jsonwebtoken.*;

import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class Jtoken {
    private static SignatureAlgorithm sA =SignatureAlgorithm.HS256;
    private static String secret= "Blue";

    static public String getTokenFor(String subject){
        Instant ins = Instant.now();
        return Jwts.builder().setSubject(subject)
                .setIssuedAt(Date.from(ins))
                .setExpiration(java.util.Date.from(ins.plus(2, ChronoUnit.HOURS)))
                .signWith(sA,secret)
                .compact();
    }
    static public void isValidToken(String token, String tokenOwner){
        try {
            String jotName = getTokenName(token);
            if (!jotName.equals(tokenOwner)) {
                throw new ServiceProviderError("No tiene permiso o session caducada");

            }
            return ;
        }
        catch ( ExpiredJwtException| UnsupportedJwtException| MalformedJwtException| SignatureException | IllegalArgumentException e){

            throw new ServiceProviderError("No tiene permiso o session caducada"+ e.getMessage());
        }
        }
    static private String getTokenName(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().get("sub",String.class);
    }
}
