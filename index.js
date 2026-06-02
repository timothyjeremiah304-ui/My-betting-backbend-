<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WackoBet Premium Mobile</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #121212;
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #ffffff;
            padding-bottom: 80px; /* Space for bottom nav */
        }
        
        /* Top Premium Header */
        .header {
            background-color: #1a1a1a;
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #e41e26;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .logo {
            font-size: 22px;
            font-weight: 900;
            color: #e41e26;
            letter-spacing: 0.5px;
        }
        .logo span { color: #ffb703; }
        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .wallet-box {
            background-color: #262626;
            padding: 6px 12px;
            border-radius: 4px;
            border: 1px solid #ffb703;
            font-weight: bold;
            font-size: 13px;
        }

        /* Sports Categories Tabs Bar */
        .sports-nav {
            display: flex;
            background-color: #1a1a1a;
            overflow-x: auto;
            white-space: nowrap;
            padding: 10px 5px;
            gap: 15px;
            border-bottom: 1px solid #2d2d2d;
        }
        .sports-nav::-webkit-scrollbar { display: none; }
        .sport-tab {
            padding: 6px 15px;
            background-color: #262626;
            border-radius: 15px;
            font-size: 13px;
            font-weight: 600;
            color: #ccc;
            cursor: pointer;
        }
        .sport-tab.active {
            background-color: #e41e26;
            color: white;
        }

        /* Promotional Dynamic Slider Area */
        .promo-banner {
            margin: 12px;
            background: linear-gradient(90deg, #e41e26 0%, #900c10 100%);
            border-radius: 8px;
            padding: 15px;
            position: relative;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .promo-banner h2 { margin: 0; font-size: 18px; font-weight: 800; color: #fff; }
        .promo-banner p { margin: 5px 0 0 0; font-size: 12px; color: #ffb703; font-weight: 600; }

        /* Main App Body Container */
        .main-container { padding: 0 12px; }
        
        .league-section {
            margin-top: 15px;
        }
        .league-title {
            font-size: 13px;
            color: #ffb703;
            margin-bottom: 8px;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        /* Match Cards Architecture */
        .match-card {
            background-color: #1c1c1c;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            border-left: 3px solid #333;
        }
        .match-card.live {
            border-left-color: #2a9d8f;
        }
        .match-meta {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #888;
            margin-bottom: 8px;
        }
        .live-tag {
            color: #2a9d8f;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .live-dot {
            width: 6px;
            height: 6px;
            background-color: #2a9d8f;
            border-radius: 50%;
            display: inline-block;
        }
        
        .match-main {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .teams-flex {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-weight: 700;
            font-size: 14px;
            width: 55%;
        }
        .team-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .live-score {
            color: #ffb703;
            font-weight: 800;
        }

        /* Odds Betting Layout */
        .odds-container {
            display: flex;
            gap: 6px;
            width: 45%;
            justify-content: flex-end;
        }
        .odds-btn {
            background-color: #2b2b2b;
            border: 1px solid #3a3a3a;
            color: white;
            flex: 1;
            padding: 10px 2px;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-width: 42px;
        }
        .odds-btn.active {
            background-color: #e41e26;
            border-color: #e41e26;
        }
        .odds-label { font-size: 9px; color: #888; margin-bottom: 2px; }
        .odds-btn.active .odds-label { color: #fff; }
        .odds-val { font-size: 13px; font-weight: 800; color: #ffb703; }
        .odds-btn.active .odds-val { color: #fff; }

        /* Floating Interactive Betslip Panel */
        .betslip-drawer {
            position: fixed;
            bottom: 56px;
            left: 0;
            right: 0;
            background-color: #1a1a1a;
            border-top: 2px solid #ffb703;
            border-radius: 12px 12px 0 0;
            padding: 15px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.6);
            display: none; /* Shows up when choice is clicked */
            z-index: 999;
        }
        .slip-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            font-weight: bold;
            color: #ffb703;
            font-size: 14px;
        }
        .close-slip { color: #888; cursor: pointer; font-size: 16px; }
        .slip-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #262626;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 12px;
        }
        .stake-box {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .stake-input {
            width: 70px;
            background-color: #121212;
            border: 1px solid #444;
            color: white;
            padding: 6px;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
        }
        .action-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .submit-btn {
            background-color: #00b4d8;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
        }
        .status-log {
            text-align: center;
            font-size: 12px;
            color: #ffb703;
        }

        /* Pro Bottom Fixed Navigation Menu */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 56px;
            background-color: #1a1a1a;
            border-top: 1px solid #2d2d2d;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 1000;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #888;
            font-size: 11px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
        }
        .nav-item.active { color: #e41e26; }
        .nav-icon { font-size: 18px; margin-bottom: 2px; }
    </style>
</head>
<body>

    <div class="header">
        <div class="logo">WACKO<span>BET</span></div>
        <div class="header-right">
            <div class="wallet-box" id="wallet-display">Bal: $500.00</div>
        </div>
    </div>

    <div class="sports-nav">
        <div class="sport-tab active">⚽ Football</div>
        <div class="sport-tab">🏀 Basketball</div>
        <div class="sport-tab">🎾 Tennis</div>
        <div class="sport-tab">🎮 Virtuals</div>
        <div class="sport-tab">🥊 Boxing</div>
    </div>

    <div class="promo-banner">
        <h2>100% WELCOME BONUS</h2>
        <p>Get up to $500 extra on your next bank deposit!</p>
    </div>

    <div class="main-container">
        
        <div class="league-section">
            <div class="league-title">
                <span class="live-dot"></span> Live Matches (In-Play)
            </div>
            
            <div class="match-card live">
                <div class="match-meta">
                    <span class="live-tag"><span class="live-dot"></span> 2nd Half 64'</span>
                    <span>ID: 4821</span>
                </div>
                <div class="match-main">
                    <div class="teams-flex">
                        <div class="team-row"><span>Arsenal</span><span class="live-score">2</span></div>
                        <div class="team-row"><span>Chelsea</span><span class="live-score">1</span></div>
                    </div>
                    <div class="odds-container">
                        <button class="odds-btn" onclick="selectBet('Arsenal vs Chelsea', 'Home', 1.45, '4821', this)">
                            <span class="odds-label">1</span><span class="odds-val">1.45</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Arsenal vs Chelsea', 'Draw', 3.20, '4821', this)">
                            <span class="odds-label">X</span><span class="odds-val">3.20</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Arsenal vs Chelsea', 'Away', 5.50, '4821', this)">
                            <span class="odds-label">2</span><span class="odds-val">5.50</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="match-card live">
                <div class="match-meta">
                    <span class="live-tag"><span class="live-dot"></span> 1st Half 12'</span>
                    <span>ID: 9022</span>
                </div>
                <div class="match-main">
                    <div class="teams-flex">
                        <div class="team-row"><span>Real Madrid</span><span class="live-score">0</span></div>
                        <div class="team-row"><span>Barcelona</span><span class="live-score">0</span></div>
                    </div>
                    <div class="odds-container">
                        <button class="odds-btn" onclick="selectBet('Real Madrid vs Barcelona', 'Home', 2.10, '9022', this)">
                            <span class="odds-label">1</span><span class="odds-val">2.10</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Real Madrid vs Barcelona', 'Draw', 3.40, '9022', this)">
                            <span class="odds-label">X</span><span class="odds-val">3.40</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Real Madrid vs Barcelona', 'Away', 3.00, '9022', this)">
                            <span class="odds-label">2</span><span class="odds-val">3.00</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="league-section">
            <div class="league-title">English Premier League (Upcoming)</div>
            
            <div class="match-card">
                <div class="match-meta">
                    <span>Today 18:00</span>
                    <span>ID: 1044</span>
                </div>
                <div class="match-main">
                    <div class="teams-flex">
                        <div class="team-row"><span>Manchester City</span></div>
                        <div class="team-row"><span>Liverpool</span></div>
                    </div>
                    <div class="odds-container">
                        <button class="odds-btn" onclick="selectBet('Man City vs Liverpool', 'Home', 1.85, '1044', this)">
                            <span class="odds-label">1</span><span class="odds-val">1.85</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Man City vs Liverpool', 'Draw', 3.80, '1044', this)">
                            <span class="odds-label">X</span><span class="odds-val">3.80</span>
                        </button>
                        <button class="odds-btn" onclick="selectBet('Man City vs Liverpool', 'Away', 3.60, '1044', this)">
                            <span class="odds-label">2</span><span class="odds-val">3.60</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="betslip-drawer" id="slip-drawer">
        <div class="slip-header">
            <span id="slip-match-title">Match Title</span>
            <span class="close-slip" onclick="closeSlip()">✕</span>
        </div>
        <div class="slip-body">
            <div>
                <div id="slip-market-pick" style="font-weight: bold; font-size: 14px; color: #00b4d8;">Pick: Home</div>
                <div style="font-size: 11px; color: #aaa; margin-top: 3px;">Estimated Return: <span id="payout-view" style="color: #2a9d8f; font-weight: bold;">$0.00</span></div>
            </div>
            <div class="stake-box">
                <span style="font-size: 12px; color: #ccc;">Stake:</span>
                <input type="number" class="stake-input" id="stake-value" value="10" oninput="updatePayoutCalculation()">
            </div>
        </div>
        <div class="action-container">
            <button class="submit-btn" onclick="sendSlipToRenderServer()">Confirm & Place Bet</button>
            <div class="status-log" id="server-status"></div>
        </div>
    </div>

    <div class="bottom-nav">
        <div class="nav-item active"><span class="nav-icon">🏠</span>Home</div>
        <div class="nav-item"><span class="nav-icon">🔥</span>Live</div>
        <div class="nav-item"><span class="nav-icon">📋</span>My Bets</div>
        <div class="nav-item"><span class="nav-icon">👤</span>Profile</div>
    </div>

    <script>
        const RENDER_LINK = "https://wacko-betting-app.onrender.com";

        let currentSelection = {
            match: "",
            prediction: "",
            odds: 0.0,
            id: ""
        };

        function selectBet(matchName, pick, oddsValue, matchId, element) {
            // Remove active style state from all other buttons across the app
            document.querySelectorAll('.odds-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active visual select highlight to clicked item
            element.classList.add('active');

            // Store choice values
            currentSelection.match = matchName;
            currentSelection.prediction = pick;
            currentSelection.odds = oddsValue;
            currentSelection.id = matchId;

            // Populate text into sliding panel layout
            document.getElementById('slip-match-title').innerText = matchName;
            document.getElementById('slip-market-pick').innerText = `Pick: ${pick} @ ${oddsValue}`;
            
            // Display sliding window drawer
            document.getElementById('slip-drawer').style.display = 'block';
            updatePayoutCalculation();
        }

        function closeSlip() {
            document.getElementById('slip-drawer').style.display = 'none';
            document.querySelectorAll('.odds-btn').forEach(btn => btn.classList.remove('active'));
        }

        function updatePayoutCalculation() {
            const stake = document.getElementById('stake-value').value;
            const dynamicPayout = stake * currentSelection.odds;
            document.getElementById('payout-view').innerText = currentSelection.odds ? `$${dynamicPayout.toFixed(2)}` : "$0.00";
        }

        async function sendSlipToRenderServer() {
            const stakeInput = document.getElementById('stake-value').value;
            const logBox = document.getElementById('server-status');

            logBox.style.color = "#ffb703";
            logBox.innerText = "Transmitting ticket down to Render engine...";

            try {
                const response = await fetch(`${RENDER_LINK}/place-bet`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prediction: currentSelection.prediction,
                        stakeCents: stakeInput * 100
                    })
                });

                const serverData = await response.json();

                if (response.ok) {
                    logBox.style.color = "#2a9d8f";
                    logBox.innerText = `🎰 Accepted! Remaining Wallet: ${serverData.walletRemaining}`;
                    document.getElementById('wallet-display').innerText = `Bal: ${serverData.walletRemaining}`;
                    setTimeout(closeSlip, 2500);
                } else {
                    logBox.style.color = "#e41e26";
                    logBox.innerText = `Declined: ${serverData.error}`;
                }
            } catch (err) {
                logBox.style.color = "#e41e26";
                logBox.innerText = "Network Error: Server can't be reached.";
            }
        }
    </script>
</body>
</html>
