import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const UserInput = new GraphQLInputObjectType({
	name: "UserInput",
	fields: () => ({
		username: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
	}),
});

export const AuthInput = new GraphQLInputObjectType({
	name: "AuthInput",
	fields: () => ({
		username: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
	}),
});
