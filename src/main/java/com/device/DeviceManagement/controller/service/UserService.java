package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.AddData;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.AddDataRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "UserService")
    public List<User> add() {
        System.out.println("Fetching user from DB...");
        return userRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "UserService")
    public List<User> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return userRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "UserService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
