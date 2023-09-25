package com.gogo.gogo.model.converter;

import com.gogo.gogo.model.Account;
import com.gogo.gogo.model.dto.AccountDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AccountConverter {

    public AccountDto convertToDto(Account account){
        return AccountDto.builder()
                .id(account.getId())
                .email(account.getEmail())
                .name(account.getName())
                .role(account.getRole())
                .createOn(account.getCreatedDate())
                .updateOn(account.getLastModifiedDate())
                .build();
    }

    public List<AccountDto> convertToDtoList (List<Account> accounts){
        return accounts.stream()
                .map(account -> convertToDto(account))
                .collect(Collectors.toList());
    }
}
