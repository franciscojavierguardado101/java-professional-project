package com.jobboard.api.messaging;

import com.jobboard.api.config.RabbitMQConfig;
import com.jobboard.api.dto.JobResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

/**
 * Publishes job events to RabbitMQ.
 *
 * Every time a job is created or updated in JobService, this producer
 * sends a JSON message to the "jobs.exchange" with a routing key of
 * "jobs.created" or "jobs.updated". RabbitMQ routes it to "jobs.queue".
 *
 * Think of this like a POST request — but instead of calling another
 * service directly, you drop a message in a queue and walk away.
 * The consumer picks it up whenever it's ready.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JobEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public void publishJobCreated(JobResponse job) {
        log.info("Publishing job.created event for job id={} title={}", job.getId(), job.getTitle());
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            "jobs.created",   // routing key — matches the "jobs.*" binding
            job               // serialized to JSON by Jackson2JsonMessageConverter
        );
    }

    public void publishJobUpdated(JobResponse job) {
        log.info("Publishing job.updated event for job id={} title={}", job.getId(), job.getTitle());
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            "jobs.updated",
            job
        );
    }
}
