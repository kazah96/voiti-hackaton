export function makeKey(token: string, deviceId: string) {
  return token + '_' + deviceId;
}

export function parseKey(payload: number[]): string[] {
  const chars = payload?.slice(3);
  return chars
    ?.map(item => String.fromCharCode(item))
    .join('')
    .split('_');
}
