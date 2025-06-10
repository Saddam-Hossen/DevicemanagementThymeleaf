package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.AddData;
import com.device.DeviceManagement.model.Category;
import com.device.DeviceManagement.repository.AddDataRepository;
import com.device.DeviceManagement.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddDataService {
    @Autowired
    private AddDataRepository addDataRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "AddDataService")
    public List<AddData> add() {
        System.out.println("Fetching user from DB...");
        return addDataRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "AddDataService")
    public List<AddData> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return addDataRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "AddDataService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
