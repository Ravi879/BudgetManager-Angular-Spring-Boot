package com.budget.manager.repository.crud;

import com.budget.manager.modal.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    @Override
    Optional<User> findById(Long userId);
}
