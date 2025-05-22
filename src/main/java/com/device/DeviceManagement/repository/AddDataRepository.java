package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.AddData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddDataRepository extends MongoRepository<AddData, String> {
    // Custom query methods (if needed) can be defined here
    List<AddData> findByStatus(String status);
    List<AddData> findByCategoryNameAndStatus(String categoryName, String status);
    AddData findByIdAndStatus(String id,String status);
    Optional<AddData> findByVisibleIdAndStatus(String deviceName, String status);
    // Custom count query for combined field
    @Query("{ 'deviceTypeServicingOrRequestingOrOldAsInputting': ?0, 'status': ?1 }")
    List<AddData> findByDeviceTypeServicingOrRequestingOrOldAsInputtingAndStatus(String deviceType, String status);

}
