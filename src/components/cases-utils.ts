export function shuffleArray<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

type DedupableCase = {
  title: string;
  print: string;
};

export function uniqueCases<T extends DedupableCase>(items: readonly T[]): T[] {
  const seenTitles = new Set<string>();
  const seenPrints = new Set<string>();

  return items.filter((item) => {
    const titleKey = item.title.trim().toLowerCase();
    const printKey = item.print.trim().toLowerCase();

    if (seenTitles.has(titleKey) || seenPrints.has(printKey)) {
      return false;
    }

    seenTitles.add(titleKey);
    seenPrints.add(printKey);
    return true;
  });
}
