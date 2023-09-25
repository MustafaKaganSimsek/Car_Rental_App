package com.gogo.gogo.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {


    private Long id;

    private String brand;

    private String model;

    private Double priceDay;

    private String gear;

    private String fuel;

    private boolean active;

    private Date createOn;

    private Date updateOn;


}
