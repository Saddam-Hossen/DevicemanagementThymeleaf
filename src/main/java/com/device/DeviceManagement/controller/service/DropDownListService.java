package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.DropDownList;
import com.device.DeviceManagement.model.User;
import com.device.DeviceManagement.repository.DropDownListRepository;
import com.device.DeviceManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DropDownListService {
    @Autowired
    private DropDownListRepository dropDownListRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "DropDownListService")
    public List<DropDownList> add() {
        System.out.println("Fetching user from DB...");
        return dropDownListRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "DropDownListService")
    public List<DropDownList> update() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return dropDownListRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "DropDownListService", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared!");
    }
}
