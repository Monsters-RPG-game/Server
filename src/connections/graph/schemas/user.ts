import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    login: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const AddUserInput = new GraphQLInputObjectType({
  name: 'AddUserInput',
  fields: {
    login: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const EditUserInput = new GraphQLInputObjectType({
  name: 'EditUserInput',
  fields: {
    login: { type: GraphQLString },
  },
});
