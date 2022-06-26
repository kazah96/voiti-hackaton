export const colorFromString = (str: string, avatarColors: Array<string>) => {
  let hash = 0;
  const len = str.length;

  for (let i = 0; i < len; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i); // NOTE: (hash << 5) - hash === hash * 31 - Researchers found that using a prime of 31 gives a better distribution to the keys, and lesser no of collisions.
    hash |= 0;
  }

  return avatarColors[Math.abs(hash) % avatarColors.length];
};
