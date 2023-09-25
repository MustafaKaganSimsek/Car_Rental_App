package com.gogo.gogo.controller;

import com.gogo.gogo.model.Car;
import com.gogo.gogo.model.converter.CarConverter;
import com.gogo.gogo.model.dto.CarDto;
import com.gogo.gogo.service.CarService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/car")
public class CarController {
    private final CarService carService;

    private final CarConverter converter;

    @GetMapping()
    public ResponseEntity<List<CarDto>>  findAllActiveCars(){
        log.debug("REST Request to find all Cars");

//        List<Car> car = carService.findAllActiveCars();
        return ResponseEntity.ok(converter.carToCarDtoListConverter(carService.findAllActiveCars()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDto> findCarById(@PathVariable Long id){
        log.debug("REST Request to find Car by Id: {}",id);

        return ResponseEntity.ok(converter.carToDtoConverter(carService.findCarById(id)));
    }
}
