import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import * as mutations from './mutations/index.js';
import * as queries from './queries/index.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...queries.user,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...mutations.user,
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
