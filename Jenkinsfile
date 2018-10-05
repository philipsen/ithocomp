pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        echo 'Run Build2'
        sh 'ls -lR'
      }
    }
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
  }
}