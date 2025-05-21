package com.myadvisor.myadvisor.model;

import jakarta.persistence.*;

@Inheritance(strategy = InheritanceType.JOINED)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "peoplesoft_id", nullable = false)
    private String peoplesoftID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "password", nullable = false)
    private String password;

    // Constructor
    public User(String peoplesoftID, String name, String surname, String email, String role, String password) {
        this.peoplesoftID = peoplesoftID;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    public User() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPeoplesoftID() {
        return peoplesoftID;
    }

    public void setPeoplesoftID(String peoplesoftID) {
        this.peoplesoftID = peoplesoftID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
