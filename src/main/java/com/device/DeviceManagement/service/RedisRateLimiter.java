package com.device.DeviceManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisRateLimiter {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final int MAX_ATTEMPTS = 5;
    private final int BLOCK_SECONDS = 60;

    public boolean isBlocked(String username) {
        String key = "login:attempts:" + username;

        String value = redisTemplate.opsForValue().get(key);
        if (value != null && Integer.parseInt(value) >= MAX_ATTEMPTS) {
            return true;
        }
        return false;
    }

    public void recordFailedAttempt(String username) {
        String key = "login:attempts:" + username;

        Long attempts = redisTemplate.opsForValue().increment(key);

        if (attempts == 1) {
            // First attempt - set expiry
            redisTemplate.expire(key, Duration.ofSeconds(BLOCK_SECONDS));
        }
    }

    public void resetAttempts(String username) {
        redisTemplate.delete("login:attempts:" + username);
    }
}
