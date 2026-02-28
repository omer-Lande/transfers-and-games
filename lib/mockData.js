export const mockTransfers = [
    {
        id: 1,
        name: "Jude Bellingham",
        date: "2023-06-14T10:00:00Z",
        isNewSigning: false,
        fee: "€103.00m",
        position: "Midfielder",
        age: 20,
        fromClub: {
            name: "Borussia Dortmund",
            crest: "https://crests.football-data.org/4.png"
        },
        toClub: {
            name: "Real Madrid CS",
            crest: "https://crests.football-data.org/86.png"
        }
    },
    {
        id: 2,
        name: "Declan Rice",
        date: "2023-07-15T14:30:00Z",
        isNewSigning: false,
        fee: "€116.60m",
        position: "Midfielder",
        age: 24,
        fromClub: {
            name: "West Ham United",
            crest: "https://crests.football-data.org/563.png"
        },
        toClub: {
            name: "Arsenal FC",
            crest: "https://crests.football-data.org/57.png"
        }
    },
    {
        id: 3,
        name: "Kylian Mbappé",
        date: new Date().toISOString(), // Today
        isNewSigning: true,
        fee: "Free Transfer",
        position: "Forward",
        age: 25,
        fromClub: {
            name: "Paris Saint-Germain",
            crest: "https://crests.football-data.org/524.png"
        },
        toClub: {
            name: "Real Madrid CS",
            crest: "https://crests.football-data.org/86.png"
        }
    },
    {
        id: 4,
        name: "Harry Kane",
        date: "2023-08-12T09:15:00Z",
        isNewSigning: false,
        fee: "€95.00m",
        position: "Forward",
        age: 30,
        fromClub: {
            name: "Tottenham Hotspur",
            crest: "https://crests.football-data.org/73.png"
        },
        toClub: {
            name: "FC Bayern Munich",
            crest: "https://crests.football-data.org/5.png"
        }
    },
    {
        id: 5,
        name: "Endrick",
        date: new Date().toISOString(), // Today
        isNewSigning: true,
        fee: "€47.50m",
        position: "Forward",
        age: 18,
        fromClub: {
            name: "SE Palmeiras",
            crest: "https://crests.football-data.org/1769.png" // Mocked ID
        },
        toClub: {
            name: "Real Madrid CS",
            crest: "https://crests.football-data.org/86.png"
        }
    },
    {
        id: 6,
        name: "Leny Yoro",
        date: new Date().toISOString(), // Today
        isNewSigning: true,
        fee: "€62.00m",
        position: "Defender",
        age: 18,
        fromClub: {
            name: "Lille OSC",
            crest: "https://crests.football-data.org/521.png"
        },
        toClub: {
            name: "Manchester United",
            crest: "https://crests.football-data.org/66.png"
        }
    }
];
