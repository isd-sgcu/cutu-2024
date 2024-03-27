package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"strconv"
	"time"

	"github.com/redis/go-redis/v9"
)

var (
	broadcastInterval = 1
)

type Broadcaster struct {
	hub   *Hub
	cache *redis.Client
}

func newBroadcaster(hub *Hub, cache *redis.Client) Broadcaster {
	return Broadcaster{
		hub:   hub,
		cache: cache,
	}
}

type TeamStatus struct {
	CU int `json:"cu"`
	TU int `json:"tu"`
}

func (b *Broadcaster) run() {
	for {
		time.Sleep(time.Duration(broadcastInterval) * time.Second)
		ctx := context.Background()
		var cuInt int
		cu, err := b.cache.Get(ctx, "t:cu").Result()
		if err != nil {
			if !errors.Is(err, redis.Nil) {
				log.Printf("[ERROR] broadcaster: %v", err)
				continue
			}
			cuInt = 0
		} else {
			cuInt, err = strconv.Atoi(cu)
			if err != nil {
				log.Printf("[ERROR] cu is not int broadcaster: %v", err)
				continue
			}
		}
		var tuInt int
		tu, err := b.cache.Get(ctx, "t:tu").Result()
		if err != nil {
			if !errors.Is(err, redis.Nil) {
				log.Printf("[ERROR] broadcaster: %v", err)
				continue
			}
			tuInt = 0
		} else {
			tuInt, err = strconv.Atoi(tu)
			if err != nil {
				log.Printf("[ERROR] tu is not int broadcaster: %v", err)
				continue
			}
		}

		raw, _ := json.Marshal(TeamStatus{
			CU: cuInt,
			TU: tuInt,
		})

		b.hub.broadcast <- raw
	}
}
