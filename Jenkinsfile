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
        // sh """
        // echo "print info"
        echo "branch = ${gitBranch}"
        echo "commit = ${gitCommit}"
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
