package com.budget.manager.modal.user;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;

    @Column(name = "first_item")
    private Boolean firstItem = true;

    @ManyToMany
    private Set<Role> roles;

    public User() {
    }

    public User(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.password = user.getPassword();

        this.roles = user.getRoles();
        this.firstItem = user.getFirstItem();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Boolean getFirstItem() {
        return firstItem;
    }

    public void setFirstItem(Boolean userFirstTimeAddingItem) {
        firstItem = userFirstTimeAddingItem;
    }

    @Override
    public String toString() {
        return "User - " + ", id " + id + ", name " + name + ", email " + email + ", password " + password + ", firstItem " + firstItem;
    }
}
