package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.BranchUser;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.BranchUserRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchUserService {
    @Autowired
    private BranchUserRepository branchUserRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "BranchUserService")
    public List<BranchUser> add() {
        System.out.println("Fetching user from DB...");
        return branchUserRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "BranchUserService")
    public List<BranchUser> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return branchUserRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "BranchUserService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
