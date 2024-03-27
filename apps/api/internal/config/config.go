package config

import (
	"os"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

type EnvironmentStruct struct {
	Listener  string
	RedisURL string
	RedisClientName string
	RedisSetting *redis.Options
}

func NewEnvironment() *EnvironmentStruct {
	err := godotenv.Load()
	if err != nil {
		// Handle error if .env file does not exist or cannot be read
		log.Err(err).Msg("Error loading .env file")
	}


	env := &EnvironmentStruct{
		Listener:  ":8080",
		RedisURL: "redis://localhost:6379",
		RedisClientName: uuid.New().String(),
	}

	if os.Getenv("LISTENER") != "" {
		env.Listener = os.Getenv("LISTENER")
	}
	if os.Getenv("REDIS_URL") != "" {
		env.RedisURL = os.Getenv("REDIS_URL")
	}

	if env.RedisSetting,err = redis.ParseURL(env.RedisURL); err != nil {
		log.Err(err).Msg("Error parsing redis url")
	} else {
		log.Debug().Any("redis_option", env.RedisSetting).Msg("Redis option")
	}

	return env
}