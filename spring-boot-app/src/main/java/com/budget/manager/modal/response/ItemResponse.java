package com.budget.manager.modal.response;

public class ItemResponse<T> {

    String msg;
    T item;

    public ItemResponse() {
    }

    public ItemResponse(String msg, T item) {
        this.msg = msg;
        this.item = item;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }
}
