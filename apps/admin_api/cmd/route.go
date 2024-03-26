package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
)

type Handler struct {
	conn *redis.Client
}

func newHandler(conn *redis.Client) Handler {
	return Handler{
		conn,
	}
}

type ChangeStateBody struct {
	NewState string `json:"new_state"`
}

func (h *Handler) ChangeState(w http.ResponseWriter, req *http.Request) {
	var body ChangeStateBody
	reader := req.Body
	defer reader.Close()

	raw, err := io.ReadAll(reader)
	if err != nil {
		log.Print("[ERROR] Unable to get body reader")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	log.Printf("%v", raw)
	if err := json.Unmarshal(raw, &body); err != nil {
		log.Printf("[ERROR] Invalid json: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid json"))
		return
	}

	ctx := context.Background()
	if err := h.conn.Set(ctx, "s:state", body.NewState, 0).Err(); err != nil {
		log.Printf("[ERROR] Unable to set new state: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
