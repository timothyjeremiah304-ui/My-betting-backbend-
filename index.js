const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// Mock Database stored safely in server memory
let userWallet = { username: "Player1", balanceCents: 50000 }; // Starts with $500.00
let liveGame = { gameId: 1, homeTeam: "Chelsea", awayTeam: "Arsenal", homeOdds: 2.10, status: "UPCOMING" };
let betSlipArchive = [];

// 1. HOME SCREEN GATEWAY CHECK
app.get('/', (req, res) => {
    res.send('<h1>Betting Backend Status: ONLINE 🚀</h1><p>Your server is live on the internet and ready to process wagers and webhooks.</p>');
});

// 2. CHECK WALLET BALANCE
app.get('/wallet', (req, res) => res.json(userWallet));

// 3. PLACE A WAGER
app.post('/place-bet', (req, res) => {
    const { prediction, stakeCents } = req.body;

    if (userWallet.balanceCents < stakeCents) {
        return res.status(400).json({ error: "Transaction declined: Insufficient funds!" });
    }
    if (liveGame.status !== "UPCOMING") {
        return res.status(400).json({ error: "Betting locked: Game has started!" });
    }

    userWallet.balanceCents -= stakeCents;
    const newBet = { betId: betSlipArchive.length + 1, prediction, stakeCents, odds: liveGame.homeOdds };
    betSlipArchive.push(newBet);

    res.json({ message: "Bet successfully accepted by server!", walletRemaining: `$${userWallet.balanceCents / 100}`, betDetails: newBet });
});

// 4. REAL PAYMENT WEBHOOK (Connects to Monnify / Paystack)
app.post('/api/v1/payments/webhook', (req, res) => {
    const paystackSignature = req.headers['x-paystack-signature'];
    const MySecretKey = "sk_live_12345XYZ"; // Your private key from your gateway account
    
    const hash = crypto.createHmac('sha512', MySecretKey)
                       .update(JSON.stringify(req.body))
                       .digest('hex');

    if (hash !== paystackSignature) {
        return res.status(401).send("Unauthorized: Signature verification failed!");
    }

    const eventData = req.body;
    if (eventData.event === 'charge.success') {
        const depositedAmount = eventData.data.amount; 
        console.log(`💰 Real Payment Confirmed! Received ${depositedAmount / 100} units.`);
        userWallet.balanceCents += depositedAmount; 
    }

    res.status(200).send('Webhook processed successfully');
});

// 5. DYNAMIC INTERNET PORT SETTING
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Betting engine live on public port ${PORT}!`));
