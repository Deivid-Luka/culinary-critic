package com.culinaryCritic.DTO.Display;

import com.culinaryCritic.entity.Restaurant;

public class RestaurantDisplay {
    private Restaurant restaurant;

    private int numberOfReviews;
    private double averageRating;
    private double averageFoodQualityRating;
    private double averageAmbianceRating;
    private double averageServiceQualityRating;
    private double averageCleanlinessRating;
    private double averageSpeedOfServiceRating;
    private double averageValueForMoneyRating;


    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public double getAverageFoodQualityRating() {
        return averageFoodQualityRating;
    }

    public void setAverageFoodQualityRating(double averageFoodQualityRating) {
        this.averageFoodQualityRating = averageFoodQualityRating;
    }

    public double getAverageAmbianceRating() {
        return averageAmbianceRating;
    }

    public void setAverageAmbianceRating(double averageAmbianceRating) {
        this.averageAmbianceRating = averageAmbianceRating;
    }

    public double getAverageServiceQualityRating() {
        return averageServiceQualityRating;
    }

    public void setAverageServiceQualityRating(double averageServiceQualityRating) {
        this.averageServiceQualityRating = averageServiceQualityRating;
    }

    public double getAverageCleanlinessRating() {
        return averageCleanlinessRating;
    }

    public void setAverageCleanlinessRating(double averageCleanlinessRating) {
        this.averageCleanlinessRating = averageCleanlinessRating;
    }

    public double getAverageSpeedOfServiceRating() {
        return averageSpeedOfServiceRating;
    }

    public void setAverageSpeedOfServiceRating(double averageSpeedOfServiceRating) {
        this.averageSpeedOfServiceRating = averageSpeedOfServiceRating;
    }

    public double getAverageValueForMoneyRating() {
        return averageValueForMoneyRating;
    }

    public void setAverageValueForMoneyRating(double averageValueForMoneyRating) {
        this.averageValueForMoneyRating = averageValueForMoneyRating;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }
}
