package com.culinaryCritic.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(name = "type_of_food", nullable = false)
    private String typeOfFood;

    private String occasion;

    @Column(name = "dining_options", nullable = false)
    private String diningOptions;

    @Column(name = "average_expense")
    private Double averageExpense;

    @Column(name = "allergy_information")
    private String allergyInformation;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Review> reviews;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTypeOfFood() {
        return typeOfFood;
    }

    public void setTypeOfFood(String typeOfFood) {
        this.typeOfFood = typeOfFood;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getDiningOptions() {
        return diningOptions;
    }

    public void setDiningOptions(String diningOptions) {
        this.diningOptions = diningOptions;
    }

    public Double getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(Double averageExpense) {
        this.averageExpense = averageExpense;
    }

    public String getAllergyInformation() {
        return allergyInformation;
    }

    public void setAllergyInformation(String allergyInformation) {
        this.allergyInformation = allergyInformation;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}