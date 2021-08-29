import {
	GraphQLBoolean,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Task } from "./taskMainListType";
import { UserError } from "./user-error";

export const TaskInput = new GraphQLInputObjectType({
	name: "TaskInput",
	fields: () => ({
		content: { type: new GraphQLNonNull(GraphQLString) },
		tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
		isPrivate: { type: new GraphQLNonNull(GraphQLBoolean) },
	}),
});

export const TaskPayload = new GraphQLObjectType({
	name: "TaskPayload",
	fields: () => ({
		Task: { type: new GraphQLNonNull(Task) },
		errors: { type: new GraphQLNonNull(new GraphQLList(UserError)) },
	}),
});
