import type { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export interface IFullError extends GraphQLError {
  extensions: GraphQLErrorExtensions & {
    code: string;
    status: number;
  };
}

export interface IFullRawError extends Error {
  code: string;
  status: number;
}
