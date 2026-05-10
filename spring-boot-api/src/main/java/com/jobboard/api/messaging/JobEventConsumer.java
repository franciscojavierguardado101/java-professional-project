package com.jobboard.api.messaging;

import com.jobboard.api.config.RabbitMQConfig;
import com.jobboard.api.dto.JobResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * Listens for job events on "jobs.queue" and processes them.
 *
 * @RabbitListener keeps a background thread subscribed to the queue.
 * When a message arrives, Spring deserializes the JSON back into a
 * JobResponse object and calls the method below automatically.
 *
 * Real-world use cases for this consumer:
 *   - Send email notifications when a new job is posted
 *   - Update a search index (Elasticsearch) when a job changes
 *   - Trigger analytics/reporting pipelines
 *
 * For now it logs the event — this proves the end-to-end flow works
 * and gives you something concrete to demo in job interviews.
 */
@Slf4j
@Component
public class JobEventConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void handleJobEvent(JobResponse job) {
        log.info("Received job event — id={} title=\"{}\" company=\"{}\" location=\"{}\"",
            job.getId(),
            job.getTitle(),
            job.getCompanyName(),
            job.getLocation()
        );
        // Future: trigger email, update Elasticsearch index, fire analytics, etc.
    }
}
