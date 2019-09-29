package com.budget.manager.controller;

import com.budget.manager.helper.Msg;
import com.budget.manager.helper.Printer;
import com.budget.manager.helper.UserSession;
import com.budget.manager.modal.response.UserResponse;
import com.budget.manager.modal.user.User;
import com.budget.manager.service.SecurityServiceImpl;
import com.budget.manager.service.crud.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin()
@RestController
@RequestMapping("/budgety/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityServiceImpl securityService;

    @PostMapping(value = "/register")
    public ResponseEntity<UserResponse> registration(@RequestBody User user, HttpServletRequest servletRequest) {
        Printer.print("/register.......... " + user.toString());

        if (user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
            UserResponse response = new UserResponse(false, Msg.EMPTY_PARAMETERS);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }

        String password = user.getPassword();
        User existingUser = userService.findByUserEmail(user.getEmail());
        if (existingUser != null) {
            UserResponse response = new UserResponse(false, Msg.USER_EXISTS);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }

        User newUser = userService.save(user);

        return getAutoLoginResponse(servletRequest, user.getEmail(), password, newUser.getId(), true);

    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody User user, HttpServletRequest servletRequest) {
        Printer.print("/login.......... " + user.toString());

        if (user.getEmail() == null || user.getPassword() == null) {
            UserResponse response = new UserResponse(false, Msg.EMPTY_CREDENTIALS);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }

        User existingUser = userService.findByUserEmail(user.getEmail());

        if (existingUser == null) {
            Printer.print("No such user exists with given email address.");
            UserResponse response = new UserResponse(false, Msg.BAD_CREDENTIALS);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }

        if (!userService.isPasswordMatch(user.getPassword(), existingUser.getPassword())) {
            Printer.print("No such user exists with given password.");
            UserResponse response = new UserResponse(false, Msg.BAD_CREDENTIALS);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }

        Printer.print(":| Given credential is valid, now trying to auto login......");

        return getAutoLoginResponse(servletRequest, user.getEmail(), user.getPassword(), existingUser.getId(), existingUser.getFirstItem());

    }


    @GetMapping("/logout.success")
    public ResponseEntity<UserResponse> logoutSuccess() {
        Printer.print("/logout.success..........");

        UserResponse response = new UserResponse();
        response.setSuccess(true);
        return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
    }

    @GetMapping({"/session.expired"})
    public ResponseEntity<UserResponse> sessionExpired() {
        Printer.print("/session.expired..........");

        UserResponse response = new UserResponse(false, Msg.SESSION_EXPIRED);
        return new ResponseEntity<UserResponse>(response, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(value = "/unauthorized")
    public ResponseEntity<String> userIsNotAuthorized() {
        return new ResponseEntity<String>(Msg.ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }


    private ResponseEntity<UserResponse> getAutoLoginResponse(HttpServletRequest servletRequest, String email, String password, Long userId, Boolean firstItem) {
        if (securityService.autoLogin(email, password)) {
            Printer.print(":) /login successful");

            //this is the only place where user id is set in session.
            UserSession.setUserId(servletRequest, userId);
            UserSession.setFirstItem(servletRequest, firstItem);

            UserResponse response = new UserResponse(true);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        } else {
            Printer.print(":( /login failed during auto login.");

            UserResponse response = new UserResponse(false, Msg.ERROR_OCCURRED);
            return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
        }
    }

}

