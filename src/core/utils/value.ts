function asString(key: string | undefined, fallback: string): string {
  if (key !== undefined) {
    return key;
  }

  return fallback;
}

function asNumber(key: string | undefined, fallback: number): number {
  if (key !== undefined) {
    return parseInt(key);
  }

  return fallback;
}

const value = {
  asString,
  asNumber,
};

export default value;
