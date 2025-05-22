package com.device.DeviceManagement;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class MongoDBTest {
    public static void main(String[] args) {
        String uri = "mongodb+srv://root:root@cluster0.lhvo556.mongodb.net/Abc?retryWrites=true&w=majority&appName=Cluster0";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            System.out.println("Connected to MongoDB Atlas successfully!");
        } catch (Exception e) {
            System.err.println("Failed to connect: " + e.getMessage());
        }
    }
}
