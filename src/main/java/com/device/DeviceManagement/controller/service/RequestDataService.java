package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.RequestData;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.RequestDataRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestDataService {
    @Autowired
    private RequestDataRepository requestDataRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "RequestDataService")
    public List<RequestData> add() {
        System.out.println("Fetching user from DB...");
        return requestDataRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "RequestDataService")
    public List<RequestData> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return requestDataRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "RequestDataService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
