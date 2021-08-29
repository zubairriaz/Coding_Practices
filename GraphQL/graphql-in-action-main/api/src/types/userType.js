import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Task } from "./taskMainListType";

export const Wrapper = ({ meScope }) => {
	let userFields = {
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
	};

	if (meScope) {
		userFields.tasklist = {
			type: new GraphQLNonNull(new GraphQLList(Task)),
			resolve: (source, args, { currentUser, loaders }) => {
				console.log(loaders)
				return loaders.tasksForUser.load(currentUser.id);
			},
		};
	}

	return userFields;
};

export const Author = new GraphQLObjectType({
	name: "Author",
	fields: () => {
		return Wrapper({ meScope: false });
	},
});

export const Me = new GraphQLObjectType({
	name: "Me",
	fields: () => {
		return Wrapper({ meScope: true });
	},
});
