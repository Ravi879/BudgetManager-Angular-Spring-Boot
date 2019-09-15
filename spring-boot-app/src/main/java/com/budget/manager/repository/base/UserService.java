package com.budget.manager.repository.base;

import com.budget.manager.modal.user.User;

public interface UserService {
    User save(User user);

    User findByUserEmail(String email);

    Boolean isPasswordMatch(String password, String encodedPassword);
}
