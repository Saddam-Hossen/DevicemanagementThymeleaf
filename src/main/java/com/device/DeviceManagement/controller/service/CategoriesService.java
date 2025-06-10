package com.device.DeviceManagement.controller.service;

import com.device.DeviceManagement.model.Category;
import com.device.DeviceManagement.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {
    @Autowired
    private CategoryRepository categoryRepository;
    // Check cache first, if not found, load from DB and cache it
    @Cacheable(value = "CategoriesService")
    public List<Category> Category() {
        System.out.println("Fetching user from DB...");
        return categoryRepository.findByStatus("1");
    }

    // Use this to update the cache when data is modified
    @CachePut(value = "CategoriesService")
    public List<Category> updateCategories() {
        // also updates the cache
        System.out.println("Cache Updated!");
        return categoryRepository.findByStatus("1");
    }

    // Optional: Evict cache
    @CacheEvict(value = "CategoriesService", allEntries = true)
    public void clearCategoriesCache() {
        System.out.println("Cache cleared!");
    }
}
