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
        ls -lR
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
