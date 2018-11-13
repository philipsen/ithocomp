
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
    def context = 'docker-for-desktop'
    if (env.BRANCH_NAME == 'master') {
      context = 'ke_thermosauh_europe-west2-a_your-first-cluster-1'
    }
    echo "context = ${context}"
    sh "helm --kube-context=${context} ls"
    sh "helm --kube-context=${context} upgrade itho helm/ithoRemote --set imageTag=${shortHash}"
  }
}
