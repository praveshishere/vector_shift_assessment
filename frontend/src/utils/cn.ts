/**
 * Type for valid class name values
 */
type ClassValue = string | number | boolean | undefined | null;

/**
 * Merges multiple class names into a single string
 * Filters out falsy values for conditional classes
 * 
 * @param classes - Class names to merge (strings, numbers, booleans, undefined, or null)
 * @returns Merged class string
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}