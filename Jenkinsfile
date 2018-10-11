
node {
  def scmVars = checkout scm

  stage('Info') {
    def commitHash = scmVars.GIT_COMMIT
    echo 'hi ${commitHash}'
    sh 'LAB=`git rev-parse --short HEAD`'
//         // sh """
//         // echo "print info"
//         echo "branch = ${GIT_BRANCH}"
//         echo "commit = ${GIT_COMMIT}"
//         //echo "lab = ${LAB}"
//         // """
  }
  stage('Build') {
    def lab = sh "git rev-parse --short HEAD"
    echo 'hi2 ${lab}'
    dockerImage = docker.build("philipsen/itho-app", "itho-app")
  } 
}
// pipeline {
//   environment {
//     registry = "https://registry.hub.docker.com"
//     registryCredential = "dockerCredentials"
//     dockerImage = ""
//   }
//   agent any
//   stages {
//     stage('Info') {
//       steps {
//         echo 'hi'
//         sh 'LAB=`git rev-parse --short HEAD`'
//         // sh """
//         // echo "print info"
//         echo "branch = ${GIT_BRANCH}"
//         echo "commit = ${GIT_COMMIT}"
//         //echo "lab = ${LAB}"
//         // """
//       }
//     }
//     stage('Build Frontend') {
//       steps {
//         script {
//           dockerImage = docker.build("philipsen/itho-app:${GIT_COMMIT}", "itho-app")
//         }
//       }
//     }
//     stage('Deploy Frontend') {
//       steps {
//         script {
//           docker.withRegistry(registry, registryCredential) {
//             dockerImage.push()
//           }
//         }
//       }
//     }
//     stage('Build Backend') {
//       steps {
//         script {
//           dockerImageBack = docker.build("philipsen/itho-api-ts:${GIT_COMMIT}", "itho-api-ts")
//         }
//       }
//     }
//     stage('Deploy Backend') {
//       steps {
//         script {
//           docker.withRegistry(registry, registryCredential) {
//             dockerImageBack.push()
//           }
//         }
//       }
//     }
//   }
// }
