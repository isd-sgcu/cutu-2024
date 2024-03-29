CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL DEFAULT '',
  image varchar(255) NOT NULL DEFAULT '',
  open boolean NOT NULL DEFAULT false,
  actions jsonb NOT NULL DEFAULT '[]',
  winner jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sid uuid NOT NULL,
  name varchar(255) NOT NULL,
  total_score integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS game_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid NOT NULL,
  player_id uuid NOT NULL,
  action jsonb NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

