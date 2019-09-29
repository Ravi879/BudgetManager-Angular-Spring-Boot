package com.budget.manager.modal.response;

public class ItemResponse<T> {

    String msg;
    T item;
    Boolean firstItem;

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

    public Boolean isFirstItem(){
        return firstItem;
    }

    public void setIsFirstItem(Boolean firstItem){
        this.firstItem = firstItem;
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }
}
