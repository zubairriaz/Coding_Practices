import {
	GraphQLID,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Author } from "./userType";

export const Approach = new GraphQLObjectType({
	name: "Approach",
	description: "To get Approach Information",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		content: {
			type: new GraphQLNonNull(GraphQLString),
		},
		voteCount: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		createdAt: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (src) => src.createdAt.toISOString(),
		},
		taskId: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		userId: {
			type: new GraphQLNonNull(GraphQLInt),
		},
		author: {
			type: new GraphQLNonNull(Author),
			resolve: (source, args, { loaders }) => loaders.users.load(source.userId)
		},
	},
});
