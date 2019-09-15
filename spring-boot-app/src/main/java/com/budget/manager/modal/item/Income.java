package com.budget.manager.modal.item;

import com.budget.manager.repository.Item;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "income")
public class Income implements Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "income_id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "value")
    private Float value;

    @JsonIgnore
    @Column(name = "user_id")
    private Long userId;

    public Income() {
    }

    public Income(String description, Float value, Long userId) {
        this.description = description;
        this.value = value;
        this.userId = userId;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    @Override
    public String toString() {
        return "Income - " + "id " + id + ",description " + description + ",value " + value + ",userId " + userId;
    }

    @Override
    public Boolean isNull() {
        return this.userId == null || this.description == null || this.value == null;
    }

}

