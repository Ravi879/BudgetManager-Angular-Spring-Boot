package com.budget.manager.repository.crud;

import com.budget.manager.modal.item.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findAllByUserId(Long user_id);

    Optional<Income> findByIdAndUserId(Long id, Long user_id);

}

