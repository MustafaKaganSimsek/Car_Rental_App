package com.gogo.gogo.controller.admin;

import com.gogo.gogo.model.Car;
import com.gogo.gogo.model.converter.CarConverter;
import com.gogo.gogo.model.dto.CarDto;
import com.gogo.gogo.model.dto.CarRequest;
import com.gogo.gogo.service.CarService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/admin/car")
public class AdminCarController {

    private final CarService carService;

    private final CarConverter carConverter;

    @GetMapping
    public ResponseEntity<List<CarDto>> findAllCars(){
        log.debug("REST Request to find all Cars");

        return ResponseEntity.ok(
                carConverter.carToCarDtoListConverter(carService.findAllCars()));
    }
    @GetMapping("{id}")
    public ResponseEntity<CarDto> findCarById(@PathVariable Long id){
        log.debug("REST Request to find Car by Id: {}",id);

        return ResponseEntity.ok(carConverter.carToDtoConverter(carService.findCarById(id)));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        log.debug("REST Request to delete Car by Id: {}",id);

        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add")
    public ResponseEntity<CarDto>  saveCar(@Valid @RequestBody CarRequest carRequest){
        log.debug("REST Request to save Car: {}", carRequest);


        return ResponseEntity.ok(carConverter.carToDtoConverter(carService.saveCar(carRequest)));
    }
//    @PostMapping("/update")
//    public ResponseEntity<CarAddingDto>  updateCar(@Valid @RequestBody CarAddingDto carAddingDto){
//        log.debug("REST Request to update Car: {}",carAddingDto);
//
//        carService.updateCar(carAddingDto);
//        return ResponseEntity.ok(carAddingDto);
//    }
}
