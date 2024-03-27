package database

import (
	"context"

	"github.com/redis/go-redis/v9"
)

type RedisCounter struct {
	pubsub *redis.PubSub
}

func NewRedisCounter(conn *redis.Conn) *RedisCounter {
	conn.PubSubChannels(context.Background(), "counting") // subscribe to all channels
	return &RedisCounter{
		pubsub: conn.PSubscribe(context.Background(), "counting"),
	}
}

func (r *RedisCounter) Publish(ctx context.Context,channel string, message string) error {
	return r.conn.Publish(ctx,channel, message).Err()
}