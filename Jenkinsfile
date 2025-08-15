pipeline {
  agent any

  environment {
    DEPLOY_USER = 'ubuntu'                         // change if different
    DEPLOY_HOST = '<TARGET_EC2_PUBLIC_IP>'         // <-- set your target EC2 IP
    DEPLOY_PATH = '/home/ubuntu/react-app'         // folder on EC2
    SSH_KEY = '~/.ssh/id_rsa'                      // Jenkins server private key path
  }

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Node & NPM Version') {
      steps {
        sh 'node -v || true'
        sh 'npm -v || true'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci || npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'test -d build && echo "Build artifacts ready."'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          echo "Preparing remote directory..."
          ssh -o StrictHostKeyChecking=no -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $DEPLOY_PATH && pkill -f \"serve -s\" || true"

          echo "Syncing build to server..."
          rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" build/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/

          echo "Starting static server on port 3000..."
          ssh -o StrictHostKeyChecking=no -i $SSH_KEY $DEPLOY_USER@$DEPLOY_HOST "nohup serve -s $DEPLOY_PATH -l 3000 > $DEPLOY_PATH/serve.log 2>&1 &"
        '''
      }
    }
  }

  post {
    success {
      echo 'Deployment completed successfully.'
    }
    failure {
      echo 'Build or deployment failed.'
    }
  }
}
