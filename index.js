const express = require('express');
const axios = require('axios'); // Required to pull data from the real sports feed
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Your verified unique API Key integrated directly here
const SPORTS_API_KEY = "3190c138dc5f083d4f7a3a698f16e828"; 

let userWallet = { username: "Player1", balanceCents: 50000 };

// 1. SERVE FRONTEND INTERFACE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. REAL-TIME LIVE MATCHES STREAMING GATEWAY
app.get('/api/live-fixtures', async (req, res) => {
    try {
        // Pulling real-time in-play football matches from the global sports data server
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
            params: { live: 'all' },
            headers: {
                'x-rapidapi-key': SPORTS_API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        });

        const realMatches = response.data.response || [];
        
        // Format the real data cleanly so our front-end can display it instantly
        const processedFixtures = realMatches.map(item => ({
            id: item.fixture.id,
            status: item.fixture.status.short,
            time: item.fixture.status.elapsed,
            league: item.league.name,
            team1: item.teams.home.name,
            team2: item.teams.away.name,
            score1: item.goals.home ?? 0,
            score2: item.goals.away ?? 0,
            odds: [
                item.goals.home > item.goals.away ? 1.40 : 2.30, 
                3.40, 
                item.goals.away > item.goals.home ? 1.50 : 3.80
            ]
        }));

        res.json(processedFixtures);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ error: "Failed to stream live global matches." });
    }
});

// 3. SECURE BET PLACEMENT ENGINE
app.post('/place-bet', (req, res) => {
    const { prediction, stakeCents } = req.body;
    if (userWallet.balanceCents < stakeCents) {
        return res.status(400).json({ error: "Insufficient wallet balance!" });
    }
    userWallet.balanceCents -= stakeCents;
    const formattedBal = (userWallet.balanceCents / 100).toFixed(2);
    res.json({ message: "Bet authorized successfully!", walletRemaining: `$${formattedBal}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Betting Infrastructure Live on port ${PORT}`));
