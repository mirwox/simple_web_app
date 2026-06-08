# ⚡ LLM Trumps

An open-weight LLM trading card battle game. Pick stats, outsmart the AI, collect them all.

## 22 Champions

| Model | Mascot | Organization |
|-------|--------|-------------|
| DeepSeek V4 | Abyssal 🐉 | DeepSeek |
| GLM-5.1 | Prismox 🦊 | Zhipu AI |
| Kimi K2.6 | Lunara 🐇 | Moonshot AI |
| Qwen 3.6 | Zephyra 🦅 | Alibaba |
| Llama 4 Maverick | Valcuno 🦙 | Meta |
| Gemma 4 | Crystara 🦉 | Google |
| Mistral Small 4 | Borealys 🐺 | Mistral AI |
| Phi-4-mini | Quarky ✨ | Microsoft |
| MiniMax M3 | Cosmox 🐱 | MiniMax |
| Command R+ | Corsair 🦜 | Cohere |
| Llama 3.1 405B | Titanus 🗿 | Meta |
| Mixtral 8x22B | Hydrax 🌩️ | Mistral AI |
| DBRX | Brickster 🧱 | Databricks |
| Grok-1 | Sarcasbot 🤖 | xAI |
| Jamba 1.5 Large | Mambara 🐍 | AI21 Labs |
| OLMo 2 | OpenOwl 🦉 | Allen AI |
| Yi 34B | Yin-Yang ☯️ | 01.AI |
| Nemotron-4 340B | GPU-Rex 🦖 | Nvidia |
| Falcon 180B | Aeris 🦅 | TII |
| Aya Expanse | Polyglot 🦁 | Cohere For AI |
| Gemma 2 27B | Crystara Prime 💎 | Google |
| DeepSeek Coder V2 | CodeKraken 🦑 | DeepSeek |

## Tech Stack

- **Backend**: Flask + SQLAlchemy
- **Frontend**: React + Vite
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Deployment**: Render

## Local Development

```bash
# 1. Create virtual environment & install Python deps
python3 -m venv venv
./venv/bin/pip install -r server/requirements.txt

# 2. Seed the database
cd server && ../venv/bin/flask --app app seed && cd ..

# 3. Install frontend deps
cd client && npm install && cd ..

# 4. Start both servers (in separate terminals)
cd server && ../venv/bin/flask --app app run --port 5000
cd client && npm run dev
```

Visit `http://localhost:3000` to play.

## Deploy to Render

1. Push to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. **New** → **Blueprint** → select your repo
4. Render will use `render.yaml` to create the web service + PostgreSQL
5. After deploy, SSH into the service and run `flask --app app seed` to populate cards

## Game Rules (Top Trumps)

1. Cards are shuffled and dealt — 11 to you, 11 to the AI
2. On your turn, pick a stat from your top card
3. Both cards are revealed — highest stat wins the round
4. Winner takes both cards; draws go to a pot
5. Play until one side has all the cards
