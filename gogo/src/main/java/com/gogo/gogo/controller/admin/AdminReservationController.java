package com.gogo.gogo.controller.admin;

import com.gogo.gogo.model.Reservation;
import com.gogo.gogo.model.converter.ReservationConverter;
import com.gogo.gogo.model.dto.ReservationDto;
import com.gogo.gogo.service.ReservationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Log4j2
@RestController
@RequestMapping("/admin/reservation")
@AllArgsConstructor
public class AdminReservationController {
    private final ReservationService reservationService;

    private final ReservationConverter reservationConverter;

    @GetMapping
    public ResponseEntity<List<ReservationDto>> findAllReservations(){
        log.debug("Request to find all Reservations");

        return ResponseEntity.ok(reservationConverter.convertToDtoList(reservationService.findAllReservations()));
    }


     @DeleteMapping("/delete/{id}")
     public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
         log.debug("Request to delete Reservation: {}",id);

         reservationService.deleteReservation(id);
         return ResponseEntity.noContent().build();
     }
}
