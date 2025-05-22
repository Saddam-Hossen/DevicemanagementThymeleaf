package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.Designation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DesignationRepository extends MongoRepository<Designation, String> {
    // write query  about delete categoryName according to categoryName
    void deleteByDesignationName(String designationName);
    // Method to find a category by its name
    Designation findByDesignationName(String designationName);
    // update DesignationName according to DesignationName
    List<Designation> findByStatus(String status);
    boolean existsByDesignationName(String DesignationName);
    boolean existsByDesignationNameAndStatus(String DesignationName, String status);

}
