//! Data Structures, Modern Operators and Strings

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrusia Dotmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4-0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// ? Challenge #1
const players1 = game.players[0]; // Bayern
const players2 = game.players[1]; // Dortmund
console.log(players1, players2);

const gk = players1.find((player) => player === 'Neuer');
console.log(gk);

const fieldPlayers = players1.slice(1);
console.log(fieldPlayers);

const allPlayers = players1.concat(players2);
console.log(allPlayers);
