package main

import (
	"context"
	"flag"
	"net/http"
	"time"

	"github.com/isd-sgcu/cutu-2024/internal/config"
	"github.com/isd-sgcu/cutu-2024/internal/service"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

var addr = flag.String("addr", ":8080", "http service address")

var hcString = []byte("OK!")

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write(hcString)
}

func main() {
	log.Ctx(context.Background()).Info().Msg("Starting server")
	env := config.NewEnvironment()
	flag.Parse()
	conn := redis.NewClient(&redis.Options{
		Addr:     env.RedisAddr,
		Password: "",
		ClientName: "cutu",
	})
	if err := conn.Ping(context.Background()).Err(); err != nil {
		log.Fatal().Ctx(context.Background()).Err(err).Msg("Unable to connect to redis")
	}
	defer conn.Close()

	log.Info().Ctx(context.Background()).Str("addr", *addr).Str("redis_addr", env.RedisAddr).Msg("Starting server")
	
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
		log.Fatal().Err(err).Msg("Unable to start server")
	}
}
