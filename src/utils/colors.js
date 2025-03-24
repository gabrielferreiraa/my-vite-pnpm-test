// Predefined color combinations for visually appealing backgrounds
export const colorPairs = [
  ['from-purple-400', 'to-pink-500'],
  ['from-blue-400', 'to-indigo-500'],
  ['from-green-400', 'to-emerald-500'],
  ['from-orange-400', 'to-red-500'],
  ['from-yellow-400', 'to-orange-500'],
  ['from-teal-400', 'to-cyan-500'],
  ['from-fuchsia-400', 'to-purple-500'],
  ['from-rose-400', 'to-red-500'],
  ['from-sky-400', 'to-blue-500'],
  ['from-violet-400', 'to-indigo-500']
];

export const getRandomColorPair = () => {
  return colorPairs[Math.floor(Math.random() * colorPairs.length)];
};