package com.culinaryCritic.repository;

import com.culinaryCritic.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByReviewerNameAndReviewDateBetween(String reviewerName, Date startDate, Date endDate);

}
