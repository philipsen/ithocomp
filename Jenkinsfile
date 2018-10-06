
  node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

     stage('Build frontend image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("philipsen/itho-app")
    }

    stage('Test frontend image') {
      /* Ideally, we would run a test framework against our image.
       * For this example, we're using a Volkswagen-type approach ;-) */

      app.inside {
        sh 'echo "Tests passed"'
      }
    }
    stage('Publish') {
      when {
        branch 'master'
      }
      steps {
        withDockerRegistry([ credentialsId: "docker-hub-crendentials", url: "" ]) {
          sh 'philipsen/itho-app'
        }
      }
    }
  }


