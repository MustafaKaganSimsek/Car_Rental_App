package com.gogo.gogo.model.converter;

import com.gogo.gogo.model.Car;
import com.gogo.gogo.model.dto.CarDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CarConverter {

    public CarDto carToDtoConverter (Car car){
        return CarDto.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .priceDay(car.getPriceDay())
                .gear(car.getGear())
                .fuel(car.getFuel())
                .active(car.isActive())
                .createOn(car.getCreatedDate())
                .updateOn(car.getLastModifiedDate())
                .build();
    }

    public List<CarDto> carToCarDtoListConverter(List<Car> cars){
        return cars.stream()
                .map(car -> carToDtoConverter(car))
                .collect(Collectors.toList());
    }
}
