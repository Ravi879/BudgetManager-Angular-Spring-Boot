package com.budget.manager.modal.item;

import java.util.List;

public class AllItem {

    private List<Income> incomes;
    private List<Expense> expenses;
    private String msg;


    public AllItem(){
    }

    public AllItem(String msg){
        this.msg = msg;
    }

    public AllItem(List<Income> incomes, List<Expense> expenses) {
        this.incomes = incomes;
        this.expenses = expenses;
    }


    public List<Income> getIncomes() {
        return incomes;
    }

    public void setIncomes(List<Income> incomes) {
        this.incomes = incomes;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
