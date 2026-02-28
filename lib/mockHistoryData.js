export const mockHistoryData = [
    {
        year: 2024,
        matches: [
            {
                competition: { name: "Premier League" },
                homeTeam: { name: "Arsenal FC", crest: "https://crests.football-data.org/57.png" },
                awayTeam: { name: "Chelsea FC", crest: "https://crests.football-data.org/61.png" },
                score: { fullTime: { home: 3, away: 1 } }
            }
        ]
    },
    {
        year: 2022,
        matches: [] // This empty array will trigger the trivia fallback in the UI
    },
    {
        year: 2018,
        matches: [
            {
                competition: { name: "Champions League" },
                homeTeam: { name: "Real Madrid CS", crest: "https://crests.football-data.org/86.png" },
                awayTeam: { name: "Liverpool FC", crest: "https://crests.football-data.org/64.png" },
                score: { fullTime: { home: 3, away: 1 } }
            }
        ]
    }
];
