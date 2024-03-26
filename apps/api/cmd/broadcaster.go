package main

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

type Broadcaster struct {
	hub   *Hub
	cache *redis.Client
	state *string
}

func newBroadcaster(hub *Hub, cache *redis.Client) Broadcaster {
	return Broadcaster{
		hub:   hub,
		cache: cache,
		state: nil,
	}
}

func (b *Broadcaster) run() {
	for {
		time.Sleep(5 * time.Second)
		ctx := context.Background()
		state, err := b.cache.Get(ctx, "s:state").Result()
		if err != nil {
			if errors.Is(err, redis.Nil) {
				continue
			}
			log.Printf("[ERROR] broadcaster: %v", err)
			continue
		}
		if b.state == nil || *b.state != state {
			b.state = &state
			b.hub.broadcast <- []byte(state)
		}
	}
}
