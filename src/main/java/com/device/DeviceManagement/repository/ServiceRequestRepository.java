package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.ServiceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {
    List<ServiceRequest> findByStatus(String status);
    ServiceRequest findByIdAndStatus(String id, String status);
    // Query to find a single record by id and status
    @Query("{ 'id': ?0, 'status': ?1 }")
    Optional<ServiceRequest> findDevicesIDS(String id, String status);
}
