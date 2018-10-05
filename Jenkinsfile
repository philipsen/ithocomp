pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        echo 'Run Build2'
        sh 'ls -lR'
      }
    }
    stage('API') {
      steps {
        sh 'docker --version'
      }
    }
  }
}