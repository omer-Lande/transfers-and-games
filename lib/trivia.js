export const triviaFacts = [
    "The fastest goal in Premier League history was scored by Shane Long in just 7.69 seconds.",
    "Lionel Messi scored an incredible 91 goals in a single calendar year (2012), setting a world record.",
    "Real Madrid holds the record for the most UEFA Champions League titles.",
    "The longest official football match ever played lasted 36 hours.",
    "Only 8 countries in history have ever won the FIFA World Cup.",
    "Pelé is the youngest player to ever win a World Cup, doing so at just 17 years old in 1958.",
    "Cristiano Ronaldo is the all-time leading goalscorer in both international football and the UEFA Champions League.",
    "Arsenal went entirely unbeaten in the Premier League during the 2003-04 season, earning the legendary nickname 'The Invincibles'.",
    "The World Cup trophy famously went missing for 7 days in 1966 before being found in a bush by a dog named Pickles.",
    "A single football match in Madagascar once ended 149-0 due to deliberate own goals scored in protest against refereeing decisions."
];

export const getRandomTrivia = () => {
    return triviaFacts[Math.floor(Math.random() * triviaFacts.length)];
};
