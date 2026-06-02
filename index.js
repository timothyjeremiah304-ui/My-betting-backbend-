const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MULTI-SPORT MASSIVE ALGORITHMIC GRID GENERATOR
app.get('/api/live-fixtures', (req, res) => {
    const timeSeed = new Date().getMinutes();
    const secSeed = new Date().getSeconds();
    
    const sportsList = ['football', 'basketball', 'hockey', 'table_tennis'];
    const leagues = {
        football: ['ENGLISH PREMIER LEAGUE', 'UEFA CHAMPIONS LEAGUE', 'SPAIN LA LIGA', 'ITALY SERIE A', 'GERMANY BUNDESLIGA', 'NIGERIAN NPFL', 'FRANCE LIGUE 1'],
        basketball: ['USA NBA FINALS', 'EUROLEAGUE CHAMPIONS', 'CHINA CBA MATRIX', 'SPAIN ACB LEAGUE'],
        hockey: ['USA NHL STANLEY CUP', 'RUSSIA KHL ELITE', 'SWEDEN SHL MATRIX'],
        table_tennis: ['WTT CHAMPIONS GRAND', 'ITTF WORLD LEAGUE', 'TT CUP INTERNATIONAL']
    };
    
    const teamPools = {
        football: [['Arsenal', 'Chelsea'], ['Real Madrid', 'Man City'], ['Barcelona', 'Bayern Munich'], ['Liverpool', 'Man United'], ['Juventus', 'AC Milan'], ['Enyimba FC', 'Kano Pillars'], ['PSG', 'Marseille']],
        basketball: [['LA Lakers', 'Boston Celtics'], ['Golden State', 'Miami Heat'], ['Brooklyn Nets', 'Milwaukee Bucks'], ['Real Madrid Baloncesto', 'Monaco']],
        hockey: [['Edmonton Oilers', 'Florida Panthers'], ['CSKA Moscow', 'SKA St. Petersburg'], ['Bruins', 'Maple Leafs']],
        table_tennis: [['Fan Zhendong', 'Hugo Calderano'], ['Tomokazu Harimoto', 'Lin Yun-ju'], ['Ma Long', 'Truls Möregårdh']]
    };

    let massSportsbookStream = [];
    let uniqueIdCounter = 1000;

    // Loop to dynamically generate a massive list of global matches
    sportsList.forEach(sport => {
        const sportLeagues = leagues[sport];
        const sportTeams = teamPools[sport];

        sportLeagues.forEach((league, leagueIdx) => {
            sportTeams.forEach((teams, teamIdx) => {
                uniqueIdCounter++;
                
                // Calculate dynamic variations based on live timestamp cycles
                const currentMatchTime = Math.abs(((timeSeed * (leagueIdx + 1) + teamIdx) % 90));
                const score1 = Math.floor((timeSeed + teamIdx) % 4);
                const score2 = Math.floor((secSeed + leagueIdx) % 3);
                
                // Algorithmic odds base calculations
                const baseOdd1 = 1.4 + ((teamIdx * 0.25) % 2.5);
                const baseOddX = 2.9 + ((leagueIdx * 0.15) % 1.5);
                const baseOdd2 = 1.8 + ((teamIdx * 0.35) % 3.5);

                massSportsbookStream.push({
                    id: 'M-' + uniqueIdCounter,
                    sport: sport,
                    league: league,
                    team1: teams[0],
                    team2: teams[1],
                    time: currentMatchTime,
                    score1: score1,
                    score2: score2,
                    markets: {
                        matchResult: [parseFloat(baseOdd1.toFixed(2)), parseFloat(baseOddX.toFixed(2)), parseFloat(baseOdd2.toFixed(2))],
                        doubleChance: [parseFloat((baseOdd1 / 1.3).toFixed(2)), parseFloat((baseOddX / 2.1).toFixed(2)), parseFloat((baseOdd2 / 1.4).toFixed(2))]
                    }
                });
            });
        });
    });

    res.json(massSportsbookStream);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`1xBet Master Clone Core active on port ${PORT}`));
