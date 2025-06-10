package com.device.DeviceManagement.controller.service;
import com.device.DeviceManagement.model.InternalUser;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.InternalUserRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternalUserService {
    @Autowired
    private InternalUserRepository internalUserRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "InternalUserService")
    public List<InternalUser> add() {
        System.out.println("Fetching user from DB...");
        return internalUserRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "InternalUserService")
    public List<InternalUser> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return internalUserRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "InternalUserService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
