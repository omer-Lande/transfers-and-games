const fs = require('fs');
const path = require('path');
const { masterTeams } = require('../lib/teams');

console.log('Starting offline procedural generation of the 2,500+ Big-5 player database...');

const firstNames = [
    "Sergio", "David", "Kevin", "Thomas", "Paul", "James", "Kylian", "Lionel", "Cristiano", "Robert",
    "Harry", "Raheem", "Jack", "Marcus", "Bruno", "Bernardo", "Ruben", "Joao", "Rodri", "Ilkay",
    "Thibaut", "Eden", "N'Golo", "Mason", "Reece", "Trent", "Andrew", "Virgil", "Alisson", "Mohamed",
    "Sadio", "Roberto", "Thiago", "Fabinho", "Gabriel", "Bukayo", "Martin", "William", "Declan", "Phil",
    "Jude", "Vinicius", "Karim", "Luka", "Toni", "Federico", "Aurelien", "Eduardo", "Pedri", "Gavi",
    "Frenkie", "Ronald", "Marc-Andre", "Antoine", "Ousmane", "Jules", "Dayot", "Leroy", "Serge", "Leon",
    "Joshua", "Manuel", "Alphonso", "Jamal", "Victor", "Khvicha", "Piotr", "Stanislav", "Domenico", "Rafael",
    "Theo", "Olivier", "Mike", "Sandro", "Dusan", "Wojciech", "Gleison", "Adrien", "Gianluigi", "Ollie",
    "Achraf", "Marquinhos", "Marco", "Neymar", "Carlos", "Thiago", "Brahim", "Alessandro", "Nicolo", "Ciro"
];

const lastNames = [
    "Ramos", "De Gea", "De Bruyne", "Muller", "Pogba", "Milner", "Mbappe", "Messi", "Ronaldo", "Lewandowski",
    "Kane", "Sterling", "Grealish", "Rashford", "Fernandes", "Silva", "Dias", "Cancelo", "Hernandez", "Gundogan",
    "Courtois", "Hazard", "Kante", "Mount", "James", "Alexander-Arnold", "Robertson", "Van Dijk", "Becker", "Salah",
    "Mane", "Firmino", "Alcantara", "Tavares", "Jesus", "Saka", "Odegaard", "Saliba", "Rice", "Foden",
    "Bellingham", "Junior", "Benzema", "Modric", "Kroos", "Valverde", "Tchouameni", "Camavinga", "Gonzalez", "Paez",
    "De Jong", "Araujo", "Ter Stegen", "Griezmann", "Dembele", "Kounde", "Upamecano", "Sane", "Gnabry", "Goretzka",
    "Kimmich", "Neuer", "Davies", "Musiala", "Osimhen", "Kvaratskhelia", "Zielinski", "Lobotka", "Berardi", "Leao",
    "Pulisic", "Giroud", "Maignan", "Tonali", "Vlahovic", "Szczesny", "Bremer", "Rabiot", "Donnarumma", "Watkins",
    "Hakimi", "Corrêa", "Verratti", "Santos", "Soler", "Paredes", "Diaz", "Bastoni", "Barella", "Immobile"
];

const journeymen = [];
const generatedNames = new Set();

let seed = 42;
const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
};

const legends = [
    { name: "Nicolas Anelka", clubs: ["Arsenal FC", "Liverpool FC", "Manchester City FC", "Chelsea FC", "Real Madrid CF", "Paris Saint-Germain FC", "Juventus FC"] },
    { name: "Kolo Toure", clubs: ["Arsenal FC", "Manchester City FC", "Liverpool FC"] },
    { name: "Emmanuel Adebayor", clubs: ["Arsenal FC", "Manchester City FC", "Tottenham Hotspur FC", "Real Madrid CF"] },
    { name: "Raheem Sterling", clubs: ["Liverpool FC", "Manchester City FC", "Chelsea FC", "Arsenal FC"] },
    { name: "Petr Cech", clubs: ["Chelsea FC", "Arsenal FC"] },
    { name: "Carlos Tevez", clubs: ["Manchester United FC", "Manchester City FC", "Juventus FC"] },
    { name: "Fernando Torres", clubs: ["Liverpool FC", "Chelsea FC", "Atlético de Madrid", "AC Milan"] },
    { name: "Zlatan Ibrahimovic", clubs: ["Juventus FC", "FC Internazionale Milano", "FC Barcelona", "AC Milan", "Paris Saint-Germain FC", "Manchester United FC"] },
    { name: "Angel Di Maria", clubs: ["Real Madrid CF", "Manchester United FC", "Paris Saint-Germain FC", "Juventus FC"] },
    { name: "Cristiano Ronaldo", clubs: ["Manchester United FC", "Real Madrid CF", "Juventus FC", "Sporting CP"] },
    { name: "Paul Pogba", clubs: ["Manchester United FC", "Juventus FC"] },
    { name: "Xabi Alonso", clubs: ["Liverpool FC", "Real Madrid CF", "FC Bayern München"] },
    { name: "Jude Bellingham", clubs: ["Borussia Dortmund", "Real Madrid CF"] },
    { name: "Robert Lewandowski", clubs: ["Borussia Dortmund", "FC Bayern München", "FC Barcelona"] },
];

legends.forEach(l => {
    journeymen.push(l);
    generatedNames.add(l.name);
});

console.log(`Pre-seeded ${legends.length} famous legends.`);

while (journeymen.length < 2500) {
    const fn = firstNames[Math.floor(rand() * firstNames.length)];
    const ln = lastNames[Math.floor(rand() * lastNames.length)];
    const fullName = `${fn} ${ln}`;

    if (!generatedNames.has(fullName)) {
        generatedNames.add(fullName);

        // Assign 2 to 5 random Big 5 clubs to simulate realistic journeymen
        const numClubs = Math.floor(rand() * 4) + 2;
        const assignedClubs = new Set();
        while (assignedClubs.size < numClubs) {
            const randomClub = masterTeams[Math.floor(rand() * masterTeams.length)].name;
            assignedClubs.add(randomClub);
        }

        journeymen.push({
            name: fullName,
            clubs: Array.from(assignedClubs)
        });
    }
}

const fileContent = `// Auto-generated 2500+ Big-5 Player database bridging Legends + Scaled Syntax
export const journeymen = ${JSON.stringify(journeymen, null, 2)};
`;

const outputPath = path.join(__dirname, '../lib/journeymen.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ Success! Written ${journeymen.length} journeymen players (filtered to Big 5 clubs) into lib/journeymen.js`);
