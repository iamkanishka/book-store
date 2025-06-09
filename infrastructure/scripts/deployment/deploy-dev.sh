#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Build and push Docker images
echo "Building and pushing Docker images..."
docker-compose -f infrastructure/docker/compose/dev.yml build

# Apply Kubernetes configurations
echo "Applying Kubernetes configurations..."
kubectl apply -k infrastructure/k8s/overlays/dev

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment -l app.kubernetes.io/part-of=book-store -n book-store-dev

# Check deployment status
echo "Checking deployment status..."
kubectl get pods -n book-store-dev

echo "Deployment completed successfully!" 