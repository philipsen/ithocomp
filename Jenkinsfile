pipeline {
  def app
  agent any
  stages {
    stage('Setup') {
      steps {
        echo 'Run Build2'
        sh 'ls -lR'
      }

    }
    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        app = docker.build("philipsen/itho-app")
    }
  }
}