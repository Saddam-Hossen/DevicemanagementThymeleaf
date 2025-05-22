package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {
    // write query  about delete categoryName according to categoryName
    void deleteByCategoryName(String categoryName);
    // Method to find a category by its name
    Category findByCategoryName(String categoryName);
    // update categoryName according to categoryName
    List<Category> findByStatus(String status);
    boolean existsByCategoryName(String categoryName);
    boolean existsByCategoryNameAndStatus(String categoryName, String status);

}
