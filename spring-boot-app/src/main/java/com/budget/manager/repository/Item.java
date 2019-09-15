package com.budget.manager.repository;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface Item {

    @JsonIgnore
    Boolean isNull();

}
