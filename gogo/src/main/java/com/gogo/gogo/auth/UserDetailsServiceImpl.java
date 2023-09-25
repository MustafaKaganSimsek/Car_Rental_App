package com.gogo.gogo.auth;



import com.gogo.gogo.model.Account;
import com.gogo.gogo.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email);
        if (account == null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return new CustomUserDetails(account);
    }

    public UserDetails loadUserById(Long id){
        Account account = accountRepository.findById(id).get();
        if (account == null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return new CustomUserDetails(account);
    }
}
