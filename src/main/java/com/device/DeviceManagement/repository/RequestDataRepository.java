package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.RequestData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestDataRepository extends MongoRepository<RequestData, String> {
    // Additional query methods can be defined here if needed
    List<RequestData> findByDepartmentNameAndStatus(String departmentName, String status);
    List<RequestData> findByStatus(String status);

    RequestData findByIdAndStatus(String Id,String status);

    // Query to find a single record by id and status
    @Query("{ 'id': ?0, 'status': ?1 }")
    Optional<RequestData> findDevicesIDS(String id, String status);
}
