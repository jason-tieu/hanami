import { Unit } from '@/lib/types';

/**
 * Cleans up unit titles by removing redundant unit code prefixes.
 * 
 * Examples:
 * - "MXB202_25se2 Advanced Calculus" → "Advanced Calculus"
 * - "CAB222_25se2 Networks" → "Networks"
 * - "Laboratory and Workshop HSE Induction – Faculty of Engineering" → unchanged
 * 
 * @param unit - The unit object containing code and title
 * @returns The cleaned title
 */
export function cleanUnitTitle(unit: Unit): string {
  if (!unit.title || !unit.code) {
    return unit.title;
  }

  // Create a pattern to match the unit code at the start of the title
  // This handles various formats like "MXB202_25se2", "CAB222_25se2", etc.
  const unitCodePattern = new RegExp(`^${escapeRegExp(unit.code)}\\s+`, 'i');
  
  // Check if the title starts with the unit code followed by a space
  const cleanedTitle = unit.title.replace(unitCodePattern, '').trim();
  
  // Only return the cleaned title if it's not empty and actually different
  // This prevents removing everything if the title was just the unit code
  if (cleanedTitle && cleanedTitle !== unit.title) {
    return cleanedTitle;
  }
  
  // Return original title if no cleaning was needed
  return unit.title;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
