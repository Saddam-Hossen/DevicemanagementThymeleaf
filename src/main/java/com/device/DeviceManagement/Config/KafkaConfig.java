/*
package com.device.DeviceManagement.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {
    @Bean
    public NewTopic loginInsert() {
        return new NewTopic("login.insert", 5, (short) 3);
    }

    @Bean
    public NewTopic customTopic() {
        return TopicBuilder.name("custom.topic")
                .partitions(5)
                .replicas(3)
                .config("retention.ms", "86400000") // 1 day
                .config("cleanup.policy", "delete")
                .build();
    }
}
*/
