package com.budget.manager.modal.response;

public class UserResponse {

    Boolean isSuccess;
    String msg;

    public UserResponse() {
    }

    public UserResponse(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public UserResponse(Boolean isSuccess, String msg) {
        this.isSuccess = isSuccess;
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public void setSuccess(Boolean success) {
        isSuccess = success;
    }

}
