package com.budget.manager.service.crud;

import com.budget.manager.modal.user.User;
import com.budget.manager.repository.base.UserService;
import com.budget.manager.repository.crud.RoleRepository;
import com.budget.manager.repository.crud.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

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

}
