package com.gogo.gogo.model.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class ReservationRequest {


    private Long carId;

    private Date day;

}
