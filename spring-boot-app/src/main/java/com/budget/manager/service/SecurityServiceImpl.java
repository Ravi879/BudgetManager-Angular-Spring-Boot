package com.budget.manager.service;

import com.budget.manager.helper.Printer;
import com.budget.manager.repository.base.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class SecurityServiceImpl implements SecurityService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /*
    Auto login :
    https://stackoverflow.com/questions/46221515/spring-security-auto-login-not-working-after-registering-user
    */

    @Override
    public Boolean autoLogin(String email, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());

        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        if (authenticate.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            Printer.print(":) Auto login for email " + email + " is successful!");
            return true;
        } else {
            Printer.print(":( Auto login for email %s is Unsuccessful!");
            return false;
        }

    }

}
