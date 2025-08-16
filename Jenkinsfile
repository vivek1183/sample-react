pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/etichiranjeevi/sample-react.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Target EC2') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no -r build/* ubuntu@52.87.253.57:/var/www/html/
                '''
            }
        }
    }
}
