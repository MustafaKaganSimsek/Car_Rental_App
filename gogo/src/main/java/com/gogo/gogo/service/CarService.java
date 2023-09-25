package com.gogo.gogo.service;

import com.gogo.gogo.exception.CarNotFoundException;
import com.gogo.gogo.model.Car;
import com.gogo.gogo.model.dto.CarRequest;
import com.gogo.gogo.repository.CarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public Car saveCar(CarRequest carRequest){
        log.debug("Request to save Car: {}", carRequest);

        Car car = Car.builder()
                .brand(carRequest.getBrand())
                .fuel(carRequest.getFuel())
                .gear(carRequest.getGear())
                .model(carRequest.getModel())
                .priceDay(carRequest.getPriceDay())
                .build();

        return carRepository.save(car);
    }

    public List<Car> findAllActiveCars(){
        log.debug("Request to find all Active Cars");

        List<Car> cars = carRepository.findAll();

        return cars.stream().filter(car -> car.isActive()).collect(Collectors.toList());
    }
    public Car findCarById(Long id){
        log.debug("Request to find Car by Id: {}",id);

        Car car = carRepository.findById(id).orElseThrow(() -> new CarNotFoundException("Car" + id + "not found"));

        return car;
    }
    public List<Car> findAllCars(){
        log.debug("Request to find all Cars");
        return carRepository.findAll();
    }

    public void deleteCar(Long id){
        log.debug("Request to delete Car by Id: {}",id);

        Car car = carRepository.findById(id).orElseThrow(() -> new CarNotFoundException("Car" + id + "not found"));

        carRepository.delete(car);

    }
//    public void updateCar(CarAddingDto carAddingDto){
//        log.debug("Request to update Car: {}",carAddingDto);
//
//        Car car = mapper.carAddingDtoToCar(carAddingDto);
//        carRepository.save(car);
//    }
    public void deleteAll(){

    }
}
