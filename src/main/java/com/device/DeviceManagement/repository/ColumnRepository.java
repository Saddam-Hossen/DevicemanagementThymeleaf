package com.device.DeviceManagement.repository;


import com.device.DeviceManagement.model.Column;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ColumnRepository extends MongoRepository<Column, String> {

    void deleteByColumnName(String columnName);

    Column findByColumnNameAndStatus(String columnName,String status);
    Column findByColumnNameAndColumnTypeAndStatus(String columnName,String columnType,String status);
    //Column findByCategoryNameAndColumnNameAndColumnTypeAndStatus(String categoryName,String columnName,String columnType,String status);
    List<Column> findByColumnTypeAndStatus(String columnType,String status);
    Optional<Column> findByCategoryNameAndColumnNameAndColumnTypeAndStatus(String categoryName, String columnName, String columnType, String status);
    List<Column> findByColumnType(String columnType);
    List<Column> findByCategoryName(String categoryName);
    boolean existsByColumnNameAndCategoryNameAndStatus(String columnName,String categoryName,String status);
    List<Column> findByCategoryNameAndStatus(String categoryName,String status);
}
