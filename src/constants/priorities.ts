export type Priority = 'low' | 'medium' | 'high';

export const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const PRIORITY_COLOR: Record<Priority, string> = {
  low: '#16A34A',
  medium: '#F59E0B',
  high: '#DC2626',
};
