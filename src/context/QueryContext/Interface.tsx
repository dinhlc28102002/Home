import { ReactNode } from 'react';

interface IQueryAction {}

interface IQueryContext {}

interface IQueryProvider {
  children: ReactNode;
}

interface IQueryState {}

export {
  type IQueryAction,
  type IQueryContext,
  type IQueryProvider,
  type IQueryState,
};
