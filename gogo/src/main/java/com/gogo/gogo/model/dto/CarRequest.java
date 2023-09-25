package com.gogo.gogo.model.dto;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CarRequest {


    @NotBlank(message = "Brand is mandatory")
    private String brand;

    @NotBlank(message = "Model is mandatory")
    private String model;

    @NotNull
    @Min(0)
    private Double priceDay;

    @NotBlank(message = "Gear is mandatory")
    private String gear;

    @NotBlank(message = "Fuel is mandatory")
    private String fuel;
}
