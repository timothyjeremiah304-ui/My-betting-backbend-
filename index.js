const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();
app.use(express.json());

// Mock Database stored safely in server memory
let userWallet = { username: "Player1", balanceCents: 50000 };
let liveGame = { gameId: 1, homeTeam: "Chelsea", awayTeam: "Arsenal", homeOdds: 2.10, drawOdds: 3.40, awayOdds: 2.90 };
let betSlipArchive = [];

// 1. HOME SCREEN GATEWAY CHECK (Serves your SportyBet Face!)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. CHECK WALLET BALANCE
app.get('/wallet', (req, res) => {
    const currentBalanceDollars = (userWallet.balanceCents / 100).toFixed(2);
    res.json({ username: userWallet.username, balance: `$${currentBalanceDollars}` });
});

// 3. PLACE A WAGER
app.post('/place-bet', (req, res) => {
    const { prediction, stakeCents } = req.body;

    if (!prediction || !stakeCents || stakeCents <= 0) {
        return res.status(400).json({ error: "Invalid parameters received." });
    }

    if (userWallet.balanceCents < stakeCents) {
        return res.status(400).json({ error: "Insufficient wallet funds!" });
    }

    userWallet.balanceCents -= stakeCents;
    const formattedBal = (userWallet.balanceCents / 100).toFixed(2);

    const newBet = { betId: betSlipArchive.length + 1, prediction, stakePaidCents: stakeCents, timestamp: new Date() };
    betSlipArchive.push(newBet);

    res.json({ message: "Bet successfully accepted by server!", walletRemaining: `$${formattedBal}` });
});

// 4. REAL PAYMENT WEBHOOK
app.post('/api/v1/payments/webhook', (req, res) => {
    const paystackSignature = req.headers['x-paystack-signature'];
    const MySecretKey = "sk_live_123456789"; 

    const hash = crypto.createHmac('sha512', MySecretKey)
                       .update(JSON.stringify(req.body))
                       .digest('hex');

    if (hash !== paystackSignature) {
        return res.status(401).send("Unauthorized Webhook Source");
    }

    const eventData = req.body;
    if (eventData.event === 'charge.success') {
        const depositedAmount = eventData.data.amount; 
        console.log(`💰 Real Payment Confirmed: ${depositedAmount} cents`);
        userWallet.balanceCents += depositedAmount;
    }

    res.status(200).send('Webhook processed');
});

// 5. DYNAMIC INTERNET PORT SETTING
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Betting backend live on port ${PORT}`));
