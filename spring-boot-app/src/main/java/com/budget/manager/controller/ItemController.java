package com.budget.manager.controller;

import com.budget.manager.helper.Msg;
import com.budget.manager.helper.Printer;
import com.budget.manager.helper.UserSession;
import com.budget.manager.modal.item.AllItem;
import com.budget.manager.modal.item.Expense;
import com.budget.manager.modal.item.Income;
import com.budget.manager.modal.response.ItemResponse;
import com.budget.manager.repository.Item;
import com.budget.manager.service.crud.ItemServiceImpl;
import com.budget.manager.service.crud.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@CrossOrigin()
@RestController
@RequestMapping("/budgety/item")
public class ItemController {

    @Autowired
    ItemServiceImpl itemService;

    @Autowired
    UserServiceImpl userService;

    @PutMapping(value = {"/income/{itemId}"})
    public ResponseEntity<ItemResponse> saveIncome(@PathVariable Long itemId, @RequestBody Income income, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        Printer.print("PUT - /income/" + itemId + ".......... " + income);

        Long userId = getUserIdORRedirectToSessionExpire(servletRequest, servletResponse);
        if (userId == null) {
            return null;
        }

        income.setUserId(userId);
        if (income.isNull()) {
            return getEmptyParameterResponse();
        }
        //updating income
        if (itemId != -1 && itemId > 0) {
            income.setId(itemId);
        }

        Item newItem = itemService.saveItem(income);
        Boolean isFirstItem = userService.isAddingFirstItem(servletRequest, userId);
        return getResponseOfItemAdded(isFirstItem, newItem, Income.class.getName());
    }

    @PutMapping(value = {"/expense/{itemId}"})
    public ResponseEntity<ItemResponse> saveExpense(@PathVariable Long itemId, @RequestBody Expense expense, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        Printer.print("PUT - /expense/" + itemId + ".......... " + expense);

        Long userId = getUserIdORRedirectToSessionExpire(servletRequest, servletResponse);
        if (userId == null) {
            return null;
        }

        expense.setUserId(userId);
        if (expense.isNull()) {
            return getEmptyParameterResponse();
        }
        //updating expense
        if (itemId != -1 && itemId > 0) {
            expense.setId(itemId);
        }

        Item newItem = itemService.saveItem(expense);
        Boolean isFirstItem = userService.isAddingFirstItem(servletRequest, userId);
        return getResponseOfItemAdded(isFirstItem, newItem, Expense.class.getName());
    }


    @GetMapping(value = "/all")
    public ResponseEntity<AllItem> getAllItem(HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        Printer.print("GET - /all..........");

        Long userId = getUserIdORRedirectToSessionExpire(servletRequest, servletResponse);
        if (userId == null) {
            return null;
        }

        AllItem items = itemService.getAllItems(userId);
        return new ResponseEntity<AllItem>(items, HttpStatus.OK);
    }

    @DeleteMapping(value = "/income/{incomeId}")
    public ResponseEntity<ItemResponse> deleteIncome(@PathVariable Long incomeId, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        Printer.print("DELETE - /income/" + incomeId + "..........");

        Long userId = getUserIdORRedirectToSessionExpire(servletRequest, servletResponse);
        if (userId == null) {
            return null;
        }


        Boolean isDeleted = itemService.deleteItem(incomeId, userId, Income.class.getName());

        return getResponseOfItemDeleted(isDeleted);
    }

    @DeleteMapping(value = "/expense/{expenseId}")
    public ResponseEntity<ItemResponse> deleteExpense(@PathVariable Long expenseId, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        Printer.print("DELETE - /expense/" + expenseId + "..........");

        Long userId = getUserIdORRedirectToSessionExpire(servletRequest, servletResponse);
        if (userId == null) {
            return null;
        }

        Boolean isDeleted = itemService.deleteItem(expenseId, userId, Expense.class.getName());
        return getResponseOfItemDeleted(isDeleted);
    }


    private ResponseEntity<ItemResponse> getResponseOfItemAdded(Boolean isFirstItem, Item item, String itemType) {
        if (item == null) {
            ItemResponse<Income> response = new ItemResponse<>();
            response.setMsg(Msg.ERROR_OCCURRED);
            return new ResponseEntity<ItemResponse>(response, HttpStatus.OK);
        }

        if (Objects.equals(itemType, Income.class.getName())) {
            ItemResponse<Income> response = new ItemResponse<>();
            Income newIncome = (Income) item;
            response.setItem(newIncome);
            response.setIsFirstItem(isFirstItem);
            return new ResponseEntity<ItemResponse>(response, HttpStatus.OK);
        } else {
            ItemResponse<Expense> response = new ItemResponse<>();
            Expense newExpense = (Expense) item;
            response.setItem(newExpense);
            response.setIsFirstItem(isFirstItem);
            return new ResponseEntity<ItemResponse>(response, HttpStatus.OK);
        }

    }

    private ResponseEntity<ItemResponse> getResponseOfItemDeleted(Boolean isDeleted) {
        ItemResponse<Boolean> response = new ItemResponse<>();
        if (isDeleted) {
            response.setItem(true);
        } else {
            response.setItem(false);
            response.setMsg(Msg.ITEM_NOT_EXISTS);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    private ResponseEntity<ItemResponse> getEmptyParameterResponse() {
        ItemResponse response = new ItemResponse();
        response.setMsg(Msg.EMPTY_PARAMETERS);
        return new ResponseEntity<ItemResponse>(response, HttpStatus.OK);

    }

    private Long getUserIdORRedirectToSessionExpire(HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        if (UserSession.isSessionExists(servletRequest, servletResponse)) {
            return UserSession.getUserId(servletRequest);
        } else {
            redirectToSessionExpire(servletResponse);
            return null;
        }
    }

    private static void redirectToSessionExpire(HttpServletResponse response){
        try {
            response.sendRedirect("/budgety/user/session.expired");
        } catch (IOException e) {
            Printer.print("IOException occurred inside UserSession.redirectToSessionExpire()");
            e.printStackTrace();
        }
    }

}