package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.DropDownList;
import com.device.DeviceManagement.model.RequestData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DropDownListRepository extends MongoRepository<DropDownList, String> {
    // Additional query methods can be defined here if needed
    List<DropDownList> findByCategoryNameAndDropDownListNameAndStatus(String categoryName,String dropDownListName, String status);
    List<DropDownList> findByStatus(String status);

    DropDownList findByIdAndStatus(String Id,String status);

    // Query to find a single record by id and status
    @Query("{ 'id': ?0, 'status': ?1 }")
    Optional<DropDownList> findDevicesIDS(String id, String status);
}
