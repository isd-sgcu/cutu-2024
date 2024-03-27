package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"time"

	"github.com/isd-sgcu/cutu-2024/internal/service"
	"github.com/redis/go-redis/v9"
)

var addr = flag.String("addr", ":8080", "http service address")

var hcString = []byte("OK!")

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write(hcString)
}

func main() {
	flag.Parse()
	conn := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
	})
	if conn.Ping(context.Background()).Err() != nil {
		log.Fatal("Unable to connect to redis")
	}
	hub := service.NewHub()
	broadcaster := service.NewBroadcaster(hub, conn)
	go hub.Run()
	go broadcaster.Run()
	http.HandleFunc("/", healthCheck)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		service.ServeWs(hub, conn, w, r)
	})
	server := &http.Server{
		Addr:              *addr,
		ReadHeaderTimeout: 3 * time.Second,
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
