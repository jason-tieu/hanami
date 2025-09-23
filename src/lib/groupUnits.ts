import { formatPeriod } from './formatters/period';

export function groupUnits(units: any[]) {
  const withPeriod = units.filter(u => u.year && u.semester);
  const withoutPeriod = units.filter(u => !u.year || !u.semester);

  // Sort by year desc, then semester desc
  withPeriod.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.semester ?? 0) - (a.semester ?? 0);
  });

  // Group by "YYYY S{n}" with optional term_display
  const groups: Record<string, any[]> = {};
  for (const u of withPeriod) {
    // Use term_display if available, otherwise fallback to S{semester} {year}
    const key = u.term_display && u.term_display.trim() 
      ? u.term_display.trim() 
      : `S${u.semester} ${u.year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(u);
  }

  // Handle no-period group
  if (withoutPeriod.length > 0) {
    groups['Other'] = withoutPeriod;
  }

  // Preserve order: keys from sorted units
  const orderedKeys: string[] = [];
  for (const u of withPeriod) {
    const key = u.term_display && u.term_display.trim() 
      ? u.term_display.trim() 
      : `S${u.semester} ${u.year}`;
    if (!orderedKeys.includes(key)) orderedKeys.push(key);
  }
  if (withoutPeriod.length > 0) orderedKeys.push('Other');

  return { groups, orderedKeys };
}
