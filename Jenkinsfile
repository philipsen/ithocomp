pipeline {
  environment {
    registry = "philipsen/itho-app"
    registryCredential = "dockerhub"
    dockerImage = ""
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        //git clone "https://github.com/philipsen/ithocomp.git"
        echo 'here'
        sh 'ls -lR'
      }
    }
    stage('Build') {
      steps {
        script {
          dockerImage = docker.build("philipsen/itho-app", "itho-app")
        }
      }
    }
    // stage('Building image') {
    //   steps{
    //     script {
    //       dockerImage = docker.build registry + :"$BUILD_NUMBER"
    //     }
    //   }
    // }
    // stage('Deploy Image') {
    //   steps{
    //     script {
    //       docker.withRegistry( '', registryCredential ) {
    //         dockerImage.push()
    //       }
    //     }
    //   }
    // }
  }
}
