package com.gogo.gogo.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationDto {

    private Long id;

    private CarDto car;

    private AccountDto account;

    private Date day;

    private Date createOn;

    private Date updateOn;

}
