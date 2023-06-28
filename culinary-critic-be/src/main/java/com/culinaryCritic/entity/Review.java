package com.culinaryCritic.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(nullable = false)
    private Double rating;

    @Column(name = "food_quality_rating", nullable = false)
    private Double foodQualityRating;

    @Column(name = "ambiance_rating", nullable = false)
    private Double ambianceRating;

    @Column(name = "service_quality_rating", nullable = false)
    private Double serviceQualityRating;

    @Column(name = "cleanliness_rating", nullable = false)
    private Double cleanlinessRating;

    @Column(name = "speed_of_service_rating", nullable = false)
    private Double speedOfServiceRating;

    @Column(name = "value_for_money_rating", nullable = false)
    private Double valueForMoneyRating;

    @Column(nullable = false, length = 100)
    private String report;

    @Column(name = "reviewer_name", nullable = false)
    private String reviewerName;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "review_date", nullable = false)
    private Date reviewDate;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Double getFoodQualityRating() {
        return foodQualityRating;
    }

    public void setFoodQualityRating(Double foodQualityRating) {
        this.foodQualityRating = foodQualityRating;
    }

    public Double getAmbianceRating() {
        return ambianceRating;
    }

    public void setAmbianceRating(Double ambianceRating) {
        this.ambianceRating = ambianceRating;
    }

    public Double getServiceQualityRating() {
        return serviceQualityRating;
    }

    public void setServiceQualityRating(Double serviceQualityRating) {
        this.serviceQualityRating = serviceQualityRating;
    }

    public Double getCleanlinessRating() {
        return cleanlinessRating;
    }

    public void setCleanlinessRating(Double cleanlinessRating) {
        this.cleanlinessRating = cleanlinessRating;
    }

    public Double getSpeedOfServiceRating() {
        return speedOfServiceRating;
    }

    public void setSpeedOfServiceRating(Double speedOfServiceRating) {
        this.speedOfServiceRating = speedOfServiceRating;
    }

    public Double getValueForMoneyRating() {
        return valueForMoneyRating;
    }

    public void setValueForMoneyRating(Double valueForMoneyRating) {
        this.valueForMoneyRating = valueForMoneyRating;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getReviewerName() {
        return reviewerName;
    }

    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
}