package com.gogo.gogo.model.converter;

import com.gogo.gogo.model.Reservation;
import com.gogo.gogo.model.dto.ReservationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ReservationConverter {

    private final CarConverter carConverter;

    private final AccountConverter accountConverter;

    public ReservationDto convertToDto(Reservation reservation){
        return ReservationDto.builder()
                .id(reservation.getId())
                .day(reservation.getDay())
                .account(accountConverter.convertToDto(reservation.getAccount()))
                .car(carConverter.carToDtoConverter(reservation.getCar()))
                .createOn(reservation.getCreatedDate())
                .updateOn(reservation.getLastModifiedDate())
                .build();
    }

    public List<ReservationDto> convertToDtoList(List<Reservation> reservations){
        return reservations.stream()
                .map(reservation -> convertToDto(reservation))
                .collect(Collectors.toList());

    }
}
