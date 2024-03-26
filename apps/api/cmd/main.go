package main

import (
	"fmt"
	"log"
	"net/http"
)

func handle(w http.ResponseWriter, r *http.Request) {
	log.Println("Received a request at my domain")
	w.Write([]byte("Hello, Domain name!"))
}

func main() {
	router := http.NewServeMux()
	router.HandleFunc("/", handle)

	server := http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	fmt.Println("Server listening on port :8080")
	server.ListenAndServe()
}
