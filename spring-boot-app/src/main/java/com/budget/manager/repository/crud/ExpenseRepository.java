package com.budget.manager.repository.crud;

import com.budget.manager.modal.item.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByUserId(Long user_id);

    Optional<Expense> findByIdAndUserId(Long id, Long user_id);
}

