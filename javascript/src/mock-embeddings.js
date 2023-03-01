const seedrandom = require('seedrandom');
const rng = seedrandom('123');

// generate an array of 100 random numbers between -1 and 1
const arr = Array.from({ length: 1536 }, () => rng() * 2 - 1);

// reshape the 1D array to a 2D array with one row and 100 columns
const arr2D = [arr];

// print the array in the specified format
console.log(`[${arr2D[0].join(', ')}]`);
