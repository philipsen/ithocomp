GIT_SHA=$(git rev-parse HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
APP_VERSION=$(cat package.json  | grep version | cut -d\" -f 4)

if [ "$GIT_BRANCH" = "master" ]; then
  IMAGE_TAG="$APP_VERSION"
else
  IMAGE_TAG="$APP_VERSION-$GIT_SHA"
fi

echo "Docker image tag will be $IMAGE_TAG"