package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.BranchUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchUserRepository extends MongoRepository<BranchUser, String> {
      List<BranchUser> findByStatus(String status);
      BranchUser findByIdAndStatus(String id,String status);
    BranchUser findByBranchNameAndUserNameAndStatus(String dept, String userName, String status);

    boolean existsByBranchNameAndUserIdAndStatus(String branchName,String userId,String status);
}
