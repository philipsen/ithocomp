
node {
  def scmVars = checkout scm
  def commitHash = scmVars.GIT_COMMIT
  def registry = "https://registry.hub.docker.com"
  def registryCredential = "dockerCredentials"
  def dockerImage = ""

  def remote = [:]
  remote.name = "node-1"
  remote.host = "MacBook-Wim"
  remote.allowAnyHosts = true

  stage('Info') {
    echo "hi ${commitHash}"
  }
  stage('Build Front') {
    dockerImage = docker.build("philipsen/itho-app:${commitHash}", "itho-app")
  } 
  stage('Deploy Frontend') {
    docker.withRegistry(registry, registryCredential) {
      dockerImage.push()
    }
  }
  stage('Build Back') {
    dockerImage = docker.build("philipsen/itho-api-ts:${commitHash}", "itho-api-ts")
  }
  stage('Deploy Back') {
    docker.withRegistry(registry, registryCredential) {
      dockerImage.push()
    }
  }
  stage('Install') {
    withCredentials([sshUserPrivateKey(credentialsId: '541f2463-f1d8-4456-a34a-c0048a64893f', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'wim')]) {
        remote.user = wim
        remote.identityFile = identity
        stage("SSH Steps Rocks!") {
            writeFile file: 'abc.sh', text: 'ls'
            sshCommand remote: remote, command: 'for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done'
            sshPut remote: remote, from: 'abc.sh', into: '.'
            sshGet remote: remote, from: 'abc.sh', into: 'bac.sh', override: true
            sshScript remote: remote, script: 'abc.sh'
            sshRemove remote: remote, path: 'abc.sh'

            sshPut remote: remote, from: 'helm', into: '/tmp/helm'
            
        }
    }
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
