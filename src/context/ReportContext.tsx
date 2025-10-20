import React, { type PropsWithChildren } from 'react';
import type { Report } from '../ParticipantReport';
import { ReportContext } from './reportContextInstance';

interface ReportProviderProps {
  report: Report | null;
  isLoading: boolean;
  error?: string | null;
}

export const ReportProvider: React.FC<PropsWithChildren<ReportProviderProps>> = ({
  children,
  report,
  isLoading,
  error = null,
}) => {
  const value = {
    report,
    isLoading,
    error,
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};