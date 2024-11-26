'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { createContext, useContext } from 'react';
import {
  IQueryProvider,
  // IQueryAction,
  // IQueryContext,
  // IQueryState,
} from './Interface';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const QueryProvider = ({ children }: IQueryProvider) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
