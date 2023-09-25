package com.gogo.gogo.repository;

import com.gogo.gogo.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Account findByEmail(String email);
    boolean existsAccountByEmail(String email);
}
