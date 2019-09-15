package com.budget.manager.service.crud;

import com.budget.manager.modal.item.AllItem;
import com.budget.manager.modal.item.Expense;
import com.budget.manager.modal.item.Income;
import com.budget.manager.repository.Item;
import com.budget.manager.repository.crud.ExpenseRepository;
import com.budget.manager.repository.crud.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ItemServiceImpl {

    @Autowired
    ExpenseRepository expenseRepo;
    @Autowired
    IncomeRepository incomeRepo;

    public Item saveItem(Item item) {

        if (Objects.equals(item.getClass().getName(), Income.class.getName())) {
            Income income = (Income) item;
            return incomeRepo.save(income);
        } else if (Objects.equals(item.getClass().getName(), Expense.class.getName())) {
            Expense expense = (Expense) item;
            return expenseRepo.save(expense);
        }

        return null;
    }

    public Boolean deleteItem(Long itemId, Long userId, String itemType) {

        if (Objects.equals(itemType, Income.class.getName())) {
            Optional<Income> income = incomeRepo.findByIdAndUserId(itemId, userId);
            if(!income.isPresent()){
                return false;
            }

            incomeRepo.deleteById(itemId);
            return true;
        } else{
            Optional<Expense> expense = expenseRepo.findByIdAndUserId(itemId, userId);
            if(!expense.isPresent()){
                return false;
            }

            expenseRepo.deleteById(itemId);
            return true;
        }

    }

    public AllItem getAllItems(Long userId) {

        List<Income> incomeList = incomeRepo.findAllByUserId(userId);
        List<Expense> expenseList = expenseRepo.findAllByUserId(userId);

        return new AllItem(incomeList, expenseList);
    }


}
