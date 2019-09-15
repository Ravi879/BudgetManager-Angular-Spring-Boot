package com.budget.manager.repository.crud;

import com.budget.manager.modal.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
