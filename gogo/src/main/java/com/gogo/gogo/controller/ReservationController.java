package com.gogo.gogo.controller;

import com.gogo.gogo.model.Reservation;
import com.gogo.gogo.model.converter.ReservationConverter;
import com.gogo.gogo.model.dto.ReservationDto;
import com.gogo.gogo.service.ReservationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
@Log4j2
@RestController()
@RequestMapping("/reservation")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    private final ReservationConverter converter;

    @PostMapping("/car/{id}")
    public ResponseEntity<List<ReservationDto>> saveReservation(@RequestBody List<Date> days,@PathVariable Long id){
        log.debug("REST Request to save Reservationday : {}, Car id :{}",days,id);

        return ResponseEntity.ok(converter.convertToDtoList(reservationService.saveReservation(days,id)));
    }
    @GetMapping
    public ResponseEntity<List<ReservationDto>> findAllReservationsForUser(){
        log.debug("REST Request to find all Reservation for USer");

        return ResponseEntity.ok(converter.convertToDtoList(reservationService.findAllReservationsForUser()));
    }

    @GetMapping("/{carId}")
    public ResponseEntity<List<ReservationDto>> findAllReservationsForUser(@PathVariable Long carId){
        log.debug("REST Request to find all Reservation for Car:{}",carId);

        return ResponseEntity.ok(converter.convertToDtoList(reservationService.findAllReservationsForCar(carId))) ;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteItem(@NotNull @PathVariable Long id) {
        log.debug("REST Request to delete Reservation: {}",id);

        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
