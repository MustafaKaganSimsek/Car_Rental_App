package com.gogo.gogo.model;

import com.gogo.gogo.enums.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class Account extends Auditable{

    @Id
    @GeneratedValue()
    private Long id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "account")
    private Set<Reservation> reservations;

    @Enumerated(EnumType.ORDINAL)
    @Column(updatable = false)
    private Role role;


}
