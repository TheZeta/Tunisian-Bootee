pipeline {
    agent any

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker-compose up --build -d'
                }
            }
        }
    }
}
