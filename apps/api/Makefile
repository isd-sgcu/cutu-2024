.PHONY: setup dev

APP_NAME=cu-tu-2024-api

setup:
	@go install github.com/cosmtrek/air@latest
	@go mod tidy

dev:
	@air

build:
	@go build -o bin/$(APP_NAME) cmd/main.go
	@echo "Build success"

build-docker:
	@docker build -t $(APP_NAME) .
