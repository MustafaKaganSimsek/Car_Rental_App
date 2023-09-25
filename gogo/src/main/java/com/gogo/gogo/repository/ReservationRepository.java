package com.gogo.gogo.repository;

import com.gogo.gogo.model.Account;
import com.gogo.gogo.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findByAccount_Id(Long customerId);

    List<Reservation> findByCar_Id(Long carId);
    boolean existsByCarIdAndDay(Long carId, Date day);
}
