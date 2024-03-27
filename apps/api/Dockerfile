# syntax=docker/dockerfile:1

FROM golang:1.22.1 AS builder

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy
COPY *.go ./

# Build
RUN CGO_ENABLED=0 GOOS=linux go build ./cmd/main.go -o /docker-gs-ping

FROM gcr.io/distroless/base-debian12 as runner

# Copy the binary from the build stage
COPY --from=builder /docker-gs-ping /

EXPOSE 8080

# Run
CMD ["/docker-gs-ping"]

