package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.Designation;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.DesignationRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignationService {
    @Autowired
    private DesignationRepository designationRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "DesignationService")
    public List<Designation> add() {
        System.out.println("Fetching user from DB...");
        return designationRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "DesignationService")
    public List<Designation> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return designationRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "DesignationService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
