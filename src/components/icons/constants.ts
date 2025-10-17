// Common colors for convenience
export const ICON_COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  white: '#ffffff',
  black: '#000000',
  gray: '#6b7280',
  muted: '#9ca3af',
} as const;

export type IconColorName = keyof typeof ICON_COLORS;