package com.budget.manager.service.crud;

import com.budget.manager.helper.UserSession;
import com.budget.manager.modal.user.User;
import com.budget.manager.repository.base.UserService;
import com.budget.manager.repository.crud.RoleRepository;
import com.budget.manager.repository.crud.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>(roleRepository.findAll()));
        return userRepository.save(user);
    }

    @Override
    public User findByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Boolean isPasswordMatch(String password, String encodedPassword) {
        return bCryptPasswordEncoder.matches(password, encodedPassword);
    }

    @Override
    public Boolean isAddingFirstItem(HttpServletRequest servletRequest, Long userId) {
        if (!UserSession.isFirstItem(servletRequest)) {
            return false;
        }

        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(user1 -> {
            user1.setFirstItem(false);
            userRepository.save(user1);
            UserSession.setFirstItem(servletRequest, false);
        });

        return true;
    }

}
