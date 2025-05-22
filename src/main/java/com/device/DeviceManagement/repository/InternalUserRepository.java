package com.device.DeviceManagement.repository;

import com.device.DeviceManagement.model.InternalUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InternalUserRepository extends MongoRepository<InternalUser, String> {

    List<InternalUser> findByStatus(String status);
    List<InternalUser> findByBranchNameAndStatus(String branchName,String status);
    InternalUser findByUserNameAndUserPasswordAndStatus(String userName,String userPassword,String status);
    InternalUser findByBranchNameAndUserNameAndUserIdAndUserPasswordAndStatus(
            String branchName,
           String userName,
           String userId,
            String userPassword,
           String status);
    boolean existsByBranchNameAndUserNameAndUserIdAndStatus(
            String branchName,
            String userName,
            String userId,
            String status
    );

    boolean existsByUserNameAndUserPasswordAndStatus(String userName,String userPassword,String status);
}
