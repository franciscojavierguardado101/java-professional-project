package com.jobboard.api.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * RabbitMQ setup:
 *
 * Exchange  → "jobs.exchange"  (TopicExchange — routes by pattern)
 * Queue     → "jobs.queue"     (durable = survives broker restarts)
 * Binding   → routes messages with routing key "jobs.*" to jobs.queue
 *
 * Jackson2JsonMessageConverter makes Spring serialize/deserialize
 * Java objects as JSON automatically — no manual conversion needed.
 */
@Configuration
public class RabbitMQConfig {

    public static final String QUEUE    = "jobs.queue";
    public static final String EXCHANGE = "jobs.exchange";
    public static final String ROUTING_KEY = "jobs.*";

    // Declares the queue in RabbitMQ (durable = true keeps it after restarts)
    @Bean
    public Queue jobsQueue() {
        return new Queue(QUEUE, true);
    }

    // TopicExchange allows routing keys with wildcards (e.g. "jobs.created", "jobs.updated")
    @Bean
    public TopicExchange jobsExchange() {
        return new TopicExchange(EXCHANGE);
    }

    // Binds the queue to the exchange so messages sent to "jobs.*" end up in jobs.queue
    @Bean
    public Binding jobsBinding(Queue jobsQueue, TopicExchange jobsExchange) {
        return BindingBuilder.bind(jobsQueue).to(jobsExchange).with(ROUTING_KEY);
    }

    // Tells Spring AMQP to serialize messages as JSON using Jackson
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // Wires the JSON converter into the RabbitTemplate (used by the producer)
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
