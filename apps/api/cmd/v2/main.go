package main

import (
	"context"

	"github.com/isd-sgcu/cutu-2024/internal/config"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

func main() {
	log.Ctx(context.Background()).Info().Msg("Starting server")
	env := config.NewEnvironment()
	conn := redis.NewClient(env.RedisSetting)

	log.Ctx(context.Background()).Info().Msg("Connecting to redis")

	if err := conn.Ping(context.Background()).Err(); err != nil {
		log.Fatal().Ctx(context.Background()).Err(err).Msg("Unable to connect to redis")
	}
	defer conn.Close()
}