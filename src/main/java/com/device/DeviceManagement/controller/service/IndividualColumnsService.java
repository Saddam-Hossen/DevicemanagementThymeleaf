package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.Column;
import com.device.DeviceManagement.repository.ColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndividualColumnsService {
    @Autowired
    private ColumnRepository columnRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "IndividualColumnService")
    public List<Column> Individual() {
        System.out.println("Fetching user from DB...");
        return columnRepository.findByColumnTypeAndStatus("individual", "1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "IndividualColumnService")
    public List<Column> updateUniversalColumn() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return columnRepository.findByColumnTypeAndStatus("individual", "1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "IndividualColumnService", allEntries = true)
    public void clearUniversalColumnCache() {
        System.out.println("Cache cleared!");
    }
}
