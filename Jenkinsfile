
node {
  def registryUserName = "philipsen"
  def scmVars = checkout scm
  def commitHash = scmVars.GIT_COMMIT
  def registry = "https://registry.hub.docker.com"
  def registryCredential = "dockerCredentials"
  def dockerImage = ""

  def remote = [:]
  remote.name = "node-1"
  remote.host = "MacBook-Wim.lan"
  remote.allowAnyHosts = true
  def shortHash = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()

  stage('Info') {
    echo "hi ${commitHash}"
    echo "short: ${shortHash}"
  }
  
  stage('Build Front') {
    dockerImage = docker.build("${registryUserName}/itho-app:${shortHash}", "itho-app")
  } 
  
  stage('Deploy Frontend') {
    docker.withRegistry(registry, registryCredential) {
      dockerImage.push()
    }
  }
  
  stage('Build Back') {
    dockerImage = docker.build("${registryUserName}/itho-api-ts:${shortHash}", "itho-api-ts")
  }
  
  stage('Deploy Back') {
    docker.withRegistry(registry, registryCredential) {
      dockerImage.push()
    }
  }

  stage('Install') {
    sh "helm ls"
    sh "helm upgrade itho helm/ithoRemote --set imageTag=${shortHash}"

    // if (env.BRANCH_NAME == 'master') {
    //   withCredentials([sshUserPrivateKey(credentialsId: '541f2463-f1d8-4456-a34a-c0048a64893f', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'wim')]) {
    //     remote.user = wim
    //     remote.identityFile = identity
    //     sshRemove remote: remote, path: '/tmp/helm', failOnError: false
    //     sshPut remote: remote, from: 'helm', into: '/tmp'
    //     sshCommand remote: remote, command: "kubectl config use-context gke_thermosauh_europe-west2-a_your-first-cluster-1; helm upgrade itho /tmp/helm/ithoRemote --set imageTag=${shortHash}"
    //   }
    // } else {
    //    withCredentials([sshUserPrivateKey(credentialsId: '541f2463-f1d8-4456-a34a-c0048a64893f', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'wim')]) {
    //     remote.user = wim
    //     remote.identityFile = identity
    //     sshRemove remote: remote, path: '/tmp/helm', failOnError: false
    //     sshPut remote: remote, from: 'helm', into: '/tmp'
    //     sshCommand remote: remote, command: "kubectl config use-context docker-for-desktop; helm upgrade itho /tmp/helm/ithoRemote --set imageTag=${shortHash}"
    //    }
    // }
  }
}
