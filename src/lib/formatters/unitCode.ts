/**
 * Utility for cleaning unit codes by removing semester/year suffixes
 */

/**
 * Cleans up unit codes by removing semester/year suffixes.
 * 
 * Examples:
 * - "MXB202_25se2" → "MXB202"
 * - "CAB222_25se1" → "CAB222"
 * - "EGH455_24se2" → "EGH455"
 * - "COMP3506" → "COMP3506" (unchanged if no suffix)
 * 
 * @param code - The raw unit code
 * @returns The cleaned unit code
 */
export function cleanUnitCode(code: string | null): string | null {
  if (!code) {
    return code;
  }

  // Pattern to match semester/year suffixes like:
  // _25se2, _25se1, _24se2, _24se1, _23se2, etc.
  // This matches: _YYseS where YY is year and S is semester (1 or 2)
  const suffixPattern = /_\d{2}se[12]$/;
  
  // Remove the suffix if it exists
  const cleanedCode = code.replace(suffixPattern, '').trim();
  
  // Return the cleaned code (should not be empty)
  return cleanedCode || code;
}
