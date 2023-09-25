package com.gogo.gogo.model.dto;

import com.gogo.gogo.enums.Role;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {
    private Long id;
    private String name;

    private String email;

    private Role role;

    private Date createOn;

    private Date updateOn;

}
