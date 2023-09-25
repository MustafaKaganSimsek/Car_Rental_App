package com.gogo.gogo.service;

import com.gogo.gogo.exception.ExistReservationExeption;
import com.gogo.gogo.exception.ReservationNotFoundException;
import com.gogo.gogo.model.Reservation;
import com.gogo.gogo.model.dto.ReservationDto;
import com.gogo.gogo.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Log4j2
@Service
@AllArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final CarService carService;

    public List<Reservation> saveReservation(List<Date> days, Long id){
        log.debug("Request to save Reservation day : {}, Car id :{}",days,id);

        days.stream().forEach(date ->{
            if(reservationRepository.existsByCarIdAndDay(id,date))
                new ExistReservationExeption("Reservation is exist id:" + id + " date:" + date);
        });

        List<Reservation> reservations = new ArrayList<>();

        days.stream().forEach(day -> reservations.add(
                Reservation.builder()
                        .car(carService.findCarById(id))
                        .day(day)
                        .account(AccountService.getCurrentAccount())
                        .build()
        ));

        return reservationRepository.saveAll(reservations);


    }
    public void deleteReservation(Long id){
        log.debug("Request to delete Reservation: {}",id);

        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException("Reservation" + id + "not found"));;

        reservationRepository.delete(reservation);

    }
    public List<Reservation> findAllReservations(){
        log.debug("Request to find all Reservations");

        List<Reservation> reservations = reservationRepository.findAll();
        return reservations;
    }

    public List<Reservation> findAllReservationsForUser(){
        log.debug("Request to find all Reservations for User: {}",AccountService.getCurrentAccount().getId());

        return reservationRepository.findByAccount_Id(AccountService.getCurrentAccount().getId());
    }

    public List<Reservation> findAllReservationsForCar(Long carId){
        log.debug("Request to find all Reservation for Car: {}",carId);

        return reservationRepository.findByCar_Id(carId);
    }
}
