const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SPORTS_API_KEY = "3190c138dc5f083d4f7a3a698f16e828"; 
let userWallet = { username: "Player1", balanceCents: 50000 };

// Serve Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Live Streaming Engine with Unlimited Fallback
app.get('/api/live-fixtures', async (req, res) => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
            params: { live: 'all' },
            headers: {
                'x-rapidapi-key': SPORTS_API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            timeout: 4000 // Prevents the server from hanging
        });

        const realMatches = response.data.response || [];
        
        if (realMatches.length > 0) {
            // Process Real Live Matches
            const processed = realMatches.map(item => ({
                id: item.fixture.id,
                league: item.league.name.toUpperCase(),
                team1: item.teams.home.name,
                team2: item.teams.away.name,
                time: item.fixture.status.elapsed || 0,
                score1: item.goals.home ?? 0,
                score2: item.goals.away ?? 0,
                odds: [1.65, 3.25, 4.20]
            }));
            return res.json(processed);
        }
        
        // If real matches are empty, trigger fallback simulation matches instantly
        throw new Error("No active real matches or API limit reached.");

    } catch (error) {
        console.log("Using dynamic fallback engine:", error.message);
        
        // Dynamic live simulations so your platform NEVER goes blank
        const timeSeed = new Date().getMinutes();
        const fallbackMatches = [
            { id: 801, league: "PREMIER LIVE SIMULATOR", team1: "Arsenal", team2: "Chelsea", time: Math.abs((timeSeed * 2) % 90), score1: Math.floor(timeSeed % 4), score2: Math.floor(timeSeed % 3), odds: [1.45, 3.20, 5.50] },
            { id: 802, league: "LIGA LIVE IN-PLAY", team1: "Real Madrid", team2: "Barcelona", time: Math.abs((timeSeed * 3) % 90), score1: Math.floor(timeSeed % 2), score2: Math.floor((timeSeed + 1) % 3), odds: [2.10, 3.40, 3.00] },
            { id: 803, league: "ENGLISH ULTRA LEAGUE", team1: "Manchester City", team2: "Liverpool", time: Math.abs((timeSeed + 10) % 90), score1: Math.floor((timeSeed + 2) % 4), score2: Math.floor(timeSeed % 2), odds: [1.85, 3.80, 3.60] }
        ];
        res.json(fallbackMatches);
    }
});

// Place Bet Endpoint
app.post('/api/place-bet', (req, res) => {
    const { matchId, selection, stake, team1, team2, odds } = req.body;
    
    let stakeCents = Math.floor(parseFloat(stake) * 100);
    if (isNaN(stakeCents) || stakeCents <= 0) {
        return res.status(400).json({ error: "Invalid stake amount!" });
    }
    if (userWallet.balanceCents < stakeCents) {
        return res.status(400).json({ error: "Insufficient funds in your wallet!" });
    }

    userWallet.balanceCents -= stakeCents;
    const currentBal = (userWallet.balanceCents / 100).toFixed(2);
    
    res.json({ 
        success: true, 
        message: "Bet Accepted!", 
        newBalance: `$${currentBal}`,
        ticket: { match: `${team1} vs ${team2}`, pick: selection, odds: odds, stake: stake }
    });
});

// Wallet Balance Endpoint
app.get('/api/wallet', (req, res) => {
    res.json({ balance: (userWallet.balanceCents / 100).toFixed(2) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Engine Running on port ${PORT}`));
