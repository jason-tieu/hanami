/**
 * Server-side utility for cleaning unit titles during sync operations
 */

/**
 * Cleans up unit titles by removing redundant unit code prefixes.
 * 
 * Examples:
 * - "MXB202_25se2 Advanced Calculus" → "Advanced Calculus"
 * - "CAB222_25se2 Networks" → "Networks"
 * - "Laboratory and Workshop HSE Induction – Faculty of Engineering" → unchanged
 * 
 * @param title - The raw title from Canvas
 * @param code - The unit code
 * @returns The cleaned title
 */
export function cleanUnitTitle(title: string, code?: string | null): string {
  if (!title || !code) {
    return title;
  }

  // Create a pattern to match the unit code at the start of the title
  // This handles various formats like "MXB202_25se2", "CAB222_25se2", etc.
  const unitCodePattern = new RegExp(`^${escapeRegExp(code)}\\s+`, 'i');
  
  // Check if the title starts with the unit code followed by a space
  const cleanedTitle = title.replace(unitCodePattern, '').trim();
  
  // Only return the cleaned title if it's not empty and actually different
  // This prevents removing everything if the title was just the unit code
  if (cleanedTitle && cleanedTitle !== title) {
    return cleanedTitle;
  }
  
  // Return original title if no cleaning was needed
  return title;
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
