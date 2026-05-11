pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                // Pull the latest code from GitHub
                checkout scm
                echo 'Code checked out from GitHub'
            }
        }

        stage('Build') {
            steps {
                // Compile the Spring Boot application
                dir('spring-boot-api') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean compile -q'
                }
                echo 'Spring Boot application compiled successfully'
            }
        }

        stage('Test') {
            steps {
                // Run unit tests (integration tests skipped — require live PostgreSQL)
                dir('spring-boot-api') {
                    sh './mvnw test -q'
                }
            }
        }

        stage('Package') {
            steps {
                // Build the production JAR file
                dir('spring-boot-api') {
                    sh './mvnw package -DskipTests -q'
                }
                echo 'JAR packaged: spring-boot-api/target/*.jar'
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline passed — Spring Boot API is ready to deploy'
        }
        failure {
            echo '❌ Pipeline failed — check the stage logs above'
        }
    }
}
