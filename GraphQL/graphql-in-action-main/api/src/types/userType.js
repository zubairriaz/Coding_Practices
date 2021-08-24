import {
	GraphQLID,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";

export const Author = new GraphQLObjectType({
	name: "Author",
	description: "To get Author Information",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		username: {
			type: new GraphQLNonNull(GraphQLString),
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
		},
	},
});
