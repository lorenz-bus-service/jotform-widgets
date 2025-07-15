IMAGE_NAME=jotform-widgets
IMAGE_TAG=0.0.2

AZURE_RESOURCE_GROUP=WebAppResourceGroup
AZURE_WEBAPP_NAME=jotform-widgets

ACR_LOGIN_SERVER=lorenzcontainerregistry.azurecr.io
ACR_NAME=LorenzContainerRegistry

build:
	@echo 'Building image...'
	docker buildx build \
	--platform linux/amd64,linux/arm64 \
	--tag $(IMAGE_NAME):$(IMAGE_TAG) \
	--tag $(IMAGE_NAME):latest \
	--tag $(ACR_LOGIN_SERVER)/$(IMAGE_NAME):$(IMAGE_TAG) \
	--tag $(ACR_LOGIN_SERVER)/$(IMAGE_NAME):latest \
	.

push: build
	@echo 'Pushing image to ACR...'
	az acr login --name $(ACR_NAME)
	docker push $(ACR_LOGIN_SERVER)/$(IMAGE_NAME):$(IMAGE_TAG)
	docker push $(ACR_LOGIN_SERVER)/$(IMAGE_NAME):latest
	az webapp restart --name "$(AZURE_WEBAPP_NAME)-uat" --resource-group $(AZURE_RESOURCE_GROUP)

list:
	@echo 'Listing the repositories in ACR...'
	az acr repository list --name $(ACR_NAME) --output table

show:
	az webapp show --name $(AZURE_WEBAPP_NAME)-uat --resource-group $(AZURE_RESOURCE_GROUP) --query "kind"
