import { createContext } from 'react';
import type { Report } from '../ParticipantReport';

export interface ReportContextType {
  report: Report | null;
  isLoading: boolean;
  error: string | null;
}

export const ReportContext = createContext<ReportContextType | null>(null);