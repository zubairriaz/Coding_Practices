import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
  } from 'graphql';
   
  import {UserError} from './user-error';
   
  export const UserDeletePayload = new GraphQLObjectType({
    name: 'UserDeletePayload',
    fields: () => ({
      errors: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(UserError)),
        ),
      },
      deletedUserId: { type: GraphQLID },
    }),
  });
   
