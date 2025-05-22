package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.RequestColumn;
import com.device.DeviceManagement.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestColumnRepository extends MongoRepository<RequestColumn, String> {
    List<RequestColumn> findByStatus(String status);
    RequestColumn findByIdAndStatus(String id,String status);
}
