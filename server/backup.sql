BEGIN TRANSACTION;
CREATE TABLE cards (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	slug VARCHAR(50) NOT NULL, 
	mascot_name VARCHAR(100) NOT NULL, 
	mascot_description TEXT, 
	mascot_image VARCHAR(200), 
	color_primary VARCHAR(7), 
	color_secondary VARCHAR(7), 
	parameters FLOAT NOT NULL, 
	context_window INTEGER NOT NULL, 
	benchmark_score INTEGER NOT NULL, 
	speed INTEGER NOT NULL, 
	community_score INTEGER NOT NULL, 
	openness INTEGER NOT NULL, 
	organization VARCHAR(100), 
	license VARCHAR(50), 
	release_year INTEGER, 
	tagline VARCHAR(300), 
	PRIMARY KEY (id), 
	UNIQUE (slug)
);
INSERT INTO "cards" VALUES(1,'DeepSeek V4','deepseek-v4','Abyssal','Born in the crushing depths of the Mariana Trench of data, Abyssal is an anglerfish dragon whose bioluminescent lure draws knowledge from the darkest corners of the internet. Its indigo scales shimmer with encoded wisdom.','/mascots/deepseek-v4.png','#0d1b4a','#00e5ff',1600.0,1000,95,60,85,95,'DeepSeek','MIT',2026,'From the abyss, infinite knowledge rises.');
INSERT INTO "cards" VALUES(2,'GLM-5.1','glm-5-1','Prismox','Prismox is a crystalline fox forged from pure light refraction. Each facet of its body splits incoming queries into spectral solutions. It sees problems from every angle simultaneously.','/mascots/glm-5-1.png','#2d1b69','#ff6bff',744.0,512,93,55,70,90,'Zhipu AI','MIT',2026,'Every problem refracts into a thousand solutions.');
INSERT INTO "cards" VALUES(3,'Kimi K2.6','kimi-k2-6','Lunara','Lunara leaps between moonbeams, her crescent antlers channeling lunar tides of computation. Patient and relentless, she runs through the longest reasoning chains without ever losing her way.','/mascots/kimi-k2-6.png','#1a1a3e','#c084fc',400.0,1000,88,65,60,75,'Moonshot AI','Modified MIT',2026,'By moonlight, the longest paths become clear.');
INSERT INTO "cards" VALUES(4,'Qwen 3.6','qwen-3-6','Zephyra','Zephyra is a wind-spirit phoenix, her jade-and-gold plumage trailing cloud wisps across every language on Earth. She speaks them all — fluently, beautifully, and fast.','/mascots/qwen-3-6.png','#0a3d2e','#34d399',235.0,128,85,90,88,92,'Alibaba','Apache 2.0',2026,'The winds carry words in every tongue.');
INSERT INTO "cards" VALUES(5,'Llama 4 Maverick','llama-4-maverick','Valcuno','Valcuno stands defiant atop a volcanic ridge, obsidian armor cracked with molten orange light. The mightiest of the open-weight herd, it charges into battle with an ecosystem of millions behind it.','/mascots/llama-4-maverick.png','#3b0a0a','#f97316',400.0,1024,87,70,98,65,'Meta','Community',2025,'From the forge of the open herd, a maverick rises.');
INSERT INTO "cards" VALUES(6,'Gemma 4','gemma-4','Crystara','Crystara perches silently on a branch of living circuitry, her diamond eyes cutting through complexity with surgical precision. Small but devastatingly efficient — a gem among giants.','/mascots/gemma-4.png','#1e1b4b','#818cf8',27.0,128,78,95,80,95,'Google','Apache 2.0',2026,'Brilliance compressed into a single gem.');
INSERT INTO "cards" VALUES(7,'Mistral Small 4','mistral-small-4','Borealys','Borealys prowls the frozen tundra, aurora borealis rippling through its fur in waves of green, purple, and blue. Its icy breath carries whispers of structured function calls.','/mascots/mistral-small-4.png','#0c2340','#38bdf8',24.0,128,76,92,75,85,'Mistral AI','Apache 2.0',2025,'Cold precision, northern beauty.');
INSERT INTO "cards" VALUES(8,'Phi-4-mini','phi-4-mini','Quarky','Quarky is impossibly small yet impossibly powerful — a quantum sprite whose electron-orbit rings hum with compressed reasoning. Proof that size is just a number.','/mascots/phi-4-mini.png','#1a1a2e','#e879f9',3.8,16,65,99,70,90,'Microsoft','MIT',2025,'Small particle. Massive impact.');
INSERT INTO "cards" VALUES(9,'MiniMax M3','minimax-m3','Cosmox','Cosmox drifts through interstellar clouds, its galaxy-swirl fur containing entire constellations. Star-cluster whiskers twitch as it processes the multimodal universe.','/mascots/minimax-m3.png','#0f172a','#fb923c',456.0,1000,86,58,50,70,'MiniMax','Open Weights',2026,'The cosmos speaks in every modality.');
INSERT INTO "cards" VALUES(10,'Command R+','command-r-plus','Corsair','Corsair is a parrot-cyborg adventurer, one brass telescope eye scanning the horizon for the best retrieval targets. Its compass-rose wings navigate RAG seas with swashbuckling confidence.','/mascots/command-r-plus.png','#1c1917','#fbbf24',104.0,128,74,80,72,88,'Cohere','CC-BY-NC',2025,'Adventure awaits in the retrieval seas.');
INSERT INTO "cards" VALUES(11,'Llama 3.1 405B','llama-3-1-405b','Titanus','Titanus is a colossal, multi-armed ancient stone golem giant forged from cracked obsidian, holding glowing magical scrolls of knowledge.','/mascots/llama-3-1-405b.png','#064e3b','#facc15',405.0,128,89,40,95,65,'Meta','Community',2024,'The colossal titan of the open-weight world.');
INSERT INTO "cards" VALUES(12,'Mixtral 8x22B','mixtral-8x22b','Hydrax','Hydrax is an eight-headed hydra dragon made of swirling storm clouds and lightning bolts, representing a powerful mixture of experts.','/mascots/mixtral-8x22b.png','#312e81','#60a5fa',141.0,64,82,75,90,85,'Mistral AI','Apache 2.0',2024,'Eight heads are better than one.');
INSERT INTO "cards" VALUES(13,'DBRX','dbrx','Brickster','Brickster is a massive cybernetic golem constructed entirely of floating, interconnected glowing data blocks and neon bricks.','/mascots/dbrx.png','#7f1d1d','#fca5a5',132.0,32,80,85,70,85,'Databricks','Open Data',2024,'Built block by data block.');
INSERT INTO "cards" VALUES(14,'Grok-1','grok-1','Sarcasbot','Sarcasbot is a sleek, chrome-plated futuristic robot with a perpetual digital smirk, juggling glowing holographic question marks.','/mascots/grok-1.png','#020617','#94a3b8',314.0,8,70,60,80,90,'xAI','Apache 2.0',2024,'Answers your questions, but with a smirk.');
INSERT INTO "cards" VALUES(15,'Jamba 1.5 Large','jamba-1-5','Mambara','Mambara is a vibrant, neon green mamba snake with infinite looping scales, symbolizing the Mamba architecture and an emerald aura.','/mascots/jamba-1-5.png','#065f46','#a7f3d0',398.0,256,81,88,65,85,'AI21 Labs','Open Weights',2024,'Infinite context, serpentine grace.');
INSERT INTO "cards" VALUES(16,'OLMo 2','olmo-2','OpenOwl','OpenOwl is a wise, fully transparent glass owl whose inner workings, cogs, and glowing blue data flows are entirely visible.','/mascots/olmo-2.png','#172554','#93c5fd',13.0,4,75,95,85,100,'Allen AI','Apache 2.0',2024,'Fully transparent, open to the core.');
INSERT INTO "cards" VALUES(17,'Yi 34B','yi-34b','Yin-Yang','Yin-Yang is a perfectly balanced, ethereal twin-tailed dragon weaving between glowing binary 0s and 1s, silver and gold.','/mascots/yi-34b.png','#4c1d95','#c4b5fd',34.0,200,78,90,75,90,'01.AI','Apache 2.0',2024,'Bilingual brilliance in perfect balance.');
INSERT INTO "cards" VALUES(18,'Nemotron-4 340B','nemotron-4-340b','GPU-Rex','GPU-Rex is a terrifyingly awesome cybernetic T-Rex powered by a glowing green heart of stacked GPUs, with metallic scales.','/mascots/nemotron-4-340b.png','#14532d','#86efac',340.0,4,85,50,60,80,'Nvidia','Open Model',2024,'A dinosaur powered by pure compute.');
INSERT INTO "cards" VALUES(19,'Falcon 180B','falcon-180b','Aeris','Aeris is a majestic, golden cyber-falcon soaring through streams of binary code with a piercing gaze and metallic feathers.','/mascots/falcon-180b.png','#78350f','#fde047',180.0,2,75,55,70,85,'TII','Falcon License',2023,'Soaring high above the open-source skies.');
INSERT INTO "cards" VALUES(20,'Aya Expanse','aya-expanse','Polyglot','Polyglot is a beautiful chimera composed of elements from different global myths, representing its massive multilingual capabilities.','/mascots/aya-expanse.png','#831843','#f9a8d4',32.0,8,80,85,88,88,'Cohere For AI','CC-BY-NC',2024,'Connecting the world, one language at a time.');
INSERT INTO "cards" VALUES(21,'Gemma 2 27B','gemma-2-27b','Crystara Prime','Crystara Prime is an evolved, highly polished crystalline golem with sharp, brilliant edges and a heart of compressed logic.','/mascots/gemma-2-27b.png','#312e81','#a5b4fc',27.0,8,84,88,85,95,'Google','Gemma License',2024,'The prime gem of the open collection.');
INSERT INTO "cards" VALUES(22,'DeepSeek Coder V2','deepseek-coder-v2','CodeKraken','CodeKraken is a deep-sea kraken whose tentacles are made of glowing code strings typing simultaneously on floating holographic keyboards.','/mascots/deepseek-coder-v2.png','#0f172a','#38bdf8',236.0,128,86,80,82,95,'DeepSeek','MIT',2024,'Unleash the kraken on your codebase.');
CREATE TABLE game_sessions (
	id INTEGER NOT NULL, 
	player_deck JSON NOT NULL, 
	ai_deck JSON NOT NULL, 
	pot JSON, 
	current_turn VARCHAR(10), 
	player_score INTEGER, 
	ai_score INTEGER, 
	status VARCHAR(20), 
	round_number INTEGER, 
	last_result JSON, 
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
	PRIMARY KEY (id)
);
INSERT INTO "game_sessions" VALUES(1,'[10, 7, 9, 8, 3]','[2, 5, 4, 6, 1]','[]','player',0,0,'active',1,'{}','2026-06-08 11:58:42');
INSERT INTO "game_sessions" VALUES(2,'[1, 10, 9, 4, 2]','[5, 6, 3, 8, 7]','[]','player',0,0,'active',1,'{}','2026-06-08 12:04:46');
INSERT INTO "game_sessions" VALUES(3,'[]','[7, 2, 4, 5, 8, 3, 1, 10, 9, 6]','[]','ai',1,6,'finished',8,'{"stat": "context_window", "stat_label": "Context (K)", "player_card": {"id": 6, "name": "Gemma 4", "slug": "gemma-4", "mascot_name": "Crystara", "mascot_description": "Crystara perches silently on a branch of living circuitry, her diamond eyes cutting through complexity with surgical precision. Small but devastatingly efficient \u2014 a gem among giants.", "mascot_image": "/mascots/gemma-4.png", "color_primary": "#1e1b4b", "color_secondary": "#818cf8", "stats": {"parameters": 27.0, "context_window": 128, "benchmark_score": 78, "speed": 95, "community_score": 80, "openness": 95}, "organization": "Google", "license": "Apache 2.0", "release_year": 2026, "tagline": "Brilliance compressed into a single gem."}, "ai_card": {"id": 9, "name": "MiniMax M3", "slug": "minimax-m3", "mascot_name": "Cosmox", "mascot_description": "Cosmox drifts through interstellar clouds, its galaxy-swirl fur containing entire constellations. Star-cluster whiskers twitch as it processes the multimodal universe.", "mascot_image": "/mascots/minimax-m3.png", "color_primary": "#0f172a", "color_secondary": "#fb923c", "stats": {"parameters": 456.0, "context_window": 1000, "benchmark_score": 86, "speed": 58, "community_score": 50, "openness": 70}, "organization": "MiniMax", "license": "Open Weights", "release_year": 2026, "tagline": "The cosmos speaks in every modality."}, "player_value": 128, "ai_value": 1000, "winner": "ai", "chose_by": "ai", "pot_count": 0}','2026-06-08 12:04:46');
INSERT INTO "game_sessions" VALUES(4,'[8, 6, 1, 5, 3, 4, 7]','[2, 9, 10]','[]','player',2,0,'active',3,'{"stat": "benchmark_score", "stat_label": "Benchmark", "player_card": {"id": 4, "name": "Qwen 3.6", "slug": "qwen-3-6", "mascot_name": "Zephyra", "mascot_description": "Zephyra is a wind-spirit phoenix, her jade-and-gold plumage trailing cloud wisps across every language on Earth. She speaks them all \u2014 fluently, beautifully, and fast.", "mascot_image": "/mascots/qwen-3-6.png", "color_primary": "#0a3d2e", "color_secondary": "#34d399", "stats": {"parameters": 235.0, "context_window": 128, "benchmark_score": 85, "speed": 90, "community_score": 88, "openness": 92}, "organization": "Alibaba", "license": "Apache 2.0", "release_year": 2026, "tagline": "The winds carry words in every tongue."}, "ai_card": {"id": 7, "name": "Mistral Small 4", "slug": "mistral-small-4", "mascot_name": "Borealys", "mascot_description": "Borealys prowls the frozen tundra, aurora borealis rippling through its fur in waves of green, purple, and blue. Its icy breath carries whispers of structured function calls.", "mascot_image": "/mascots/mistral-small-4.png", "color_primary": "#0c2340", "color_secondary": "#38bdf8", "stats": {"parameters": 24.0, "context_window": 128, "benchmark_score": 76, "speed": 92, "community_score": 75, "openness": 85}, "organization": "Mistral AI", "license": "Apache 2.0", "release_year": 2025, "tagline": "Cold precision, northern beauty."}, "player_value": 85, "ai_value": 76, "winner": "player", "chose_by": "player", "pot_count": 0}','2026-06-08 12:06:02');
INSERT INTO "game_sessions" VALUES(5,'[5, 8, 4, 9, 1]','[3, 7, 10, 2, 6]','[]','player',0,0,'active',1,'{}','2026-06-08 12:07:58');
INSERT INTO "game_sessions" VALUES(6,'[6, 10, 3, 4, 5]','[1, 2, 9, 8, 7]','[]','player',0,0,'active',1,'{}','2026-06-08 12:07:58');
INSERT INTO "game_sessions" VALUES(7,'[2, 4, 8, 10, 3]','[7, 1, 9, 5, 6]','[]','player',0,0,'active',1,'{}','2026-06-08 12:16:53');
INSERT INTO "game_sessions" VALUES(8,'[1, 2, 9, 3, 8]','[6, 5, 10, 4, 7]','[]','player',0,0,'active',1,'{}','2026-06-08 12:16:53');
INSERT INTO "game_sessions" VALUES(9,'[8, 1, 3, 4, 2]','[6, 10, 9, 7, 5]','[]','player',0,0,'active',1,'{}','2026-06-08 12:20:22');
INSERT INTO "game_sessions" VALUES(10,'[4, 8, 3, 10, 6]','[1, 7, 5, 2, 9]','[]','player',0,0,'active',1,'{}','2026-06-08 12:20:22');
INSERT INTO "game_sessions" VALUES(11,'[7, 2, 4, 5, 8]','[1, 6, 9, 3, 10]','[]','player',0,0,'active',1,'{}','2026-06-08 12:21:34');
INSERT INTO "game_sessions" VALUES(12,'[3, 4, 10, 1, 6]','[2, 9, 8, 7, 5]','[]','player',0,0,'active',1,'{}','2026-06-08 12:21:34');
COMMIT;
