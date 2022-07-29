export const capitalize = (s: string) => {
  if (s.length > 0) {
    return s[0].toUpperCase() + s.substring(1).toLowerCase();
  }
  return s;
};

export const deduplicate = (strArr: string[]) => {
  const dupesMap: Record<string, boolean | undefined> = {};
  return strArr.filter((s) => {
    if (dupesMap[s]) {
      return false;
    } else {
      dupesMap[s] = true;
      return true;
    }
  });
};
