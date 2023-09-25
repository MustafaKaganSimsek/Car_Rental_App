package com.gogo.gogo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car")
public class Car extends Auditable{

    @Id
    @GeneratedValue()
    @Column(name = "id")
    private Long id;

    @Column
    private String brand;

    @Column
    private String model;

    @Column
    private Double priceDay;

    @Column
    private String gear;

    @Column
    private String fuel;

    @OneToMany(mappedBy = "car")
    private Set<Reservation> reservations;
    @Column
    @Builder.Default
    private boolean active = true;

}
