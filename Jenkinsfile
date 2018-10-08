pipeline {
  environment {
    registry = "https://registry.hub.docker.com"
    registryCredential = "dockerCredentials"
    dockerImage = ""
  }
  agent any
  stages {
    stage('Info') {
      steps {
        echo 'hi'
        step {
          def tag = "a"
          echo tag  
        }
        
        // sh """
        // echo "print info"
        echo "branch = ${GIT_BRANCH}"
        echo "commit = ${GIT_COMMIT}"
        // """
      }
    }
    stage('Build Frontend') {
      steps {
        script {
          dockerImage = docker.build("philipsen/itho-app", "itho-app")
        }
      }
    }
    stage('Deploy Frontend') {
      steps {
        script {
          docker.withRegistry(registry, registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Build Backend') {
      steps {
        script {
          dockerImageBack = docker.build("philipsen/itho-api-ts", "itho-api-ts")
        }
      }
    }
    stage('Deploy Backend') {
      steps {
        script {
          docker.withRegistry(registry, registryCredential) {
            dockerImageBack.push()
          }
        }
      }
    }
  }
}
