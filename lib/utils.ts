// Personal utility functions I use across the project
// These are my go-to helpers that I've refined over time

/**
 * Format large numbers with commas
 * e.g., 100000 -> "100,000"
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Debounce function to limit how often a function can fire
 * Useful for search inputs to avoid too many re-renders
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if we're running in browser
 * Helps avoid SSR issues
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Get initials from name
 * e.g., "John Doe" -> "JD"
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Sleep function for async delays
 * Useful for testing loading states
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
