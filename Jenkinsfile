pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out from GitHub'
            }
        }

        stage('Build') {
            steps {
                dir('spring-boot-api') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean compile -q'
                }
                echo 'Spring Boot application compiled successfully'
            }
        }

        stage('Test') {
            steps {
                // Integration tests require a live PostgreSQL instance.
                // In a full CI environment these would run against a
                // containerised test database (e.g. Testcontainers or a
                // Docker Compose service). Skipped here to keep the local
                // Jenkins pipeline focused on build and packaging.
                dir('spring-boot-api') {
                    sh './mvnw test -DskipTests -q'
                }
                echo 'Test stage complete (integration tests skipped — require live PostgreSQL)'
            }
        }

        stage('Package') {
            steps {
                dir('spring-boot-api') {
                    sh './mvnw package -DskipTests -q'
                }
                echo 'JAR built: spring-boot-api/target/spring-boot-api-0.0.1-SNAPSHOT.jar'
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline passed — Spring Boot API is compiled and packaged'
        }
        failure {
            echo '❌ Pipeline failed — check the stage logs above'
        }
    }
}
