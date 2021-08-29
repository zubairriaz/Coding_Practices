import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ApproachInput, ApproachPayload } from "../types/input-approach";
import { TaskInput, TaskPayload } from "../types/input-task";
import { AuthInput, UserInput } from "../types/input-user";
import { UserDeletePayload } from "../types/payload-user-delete";
import { UserPayload } from "../types/user-payload";

export const Mutator = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({
		userDelete: {
			type: UserDeletePayload,
			resolve: async (source, args, { mutators, currentUser }) => {
				return mutators.userDelete({ currentUser });
			},
		},
		approachCreate: {
			type: new GraphQLNonNull(ApproachPayload),
			args: {
				taskId: { type: new GraphQLNonNull(GraphQLID) },
				input: { type: new GraphQLNonNull(ApproachInput) },
			},
			resolve: async (source, args, { mutators, currentUser }) => {
				return mutators.approachCreate({
					...args,
					mutators,
					currentUser,
				});
			},
		},
		userCreate: {
			type: new GraphQLNonNull(UserPayload),
			args: {
				input: { type: new GraphQLNonNull(UserInput) },
			},
			resolve: async (source, args, { mutators }) => {
				return mutators.userCreate(args.input);
			},
		},
		userLogin: {
			type: new GraphQLNonNull(UserPayload),
			args: {
				input: { type: new GraphQLNonNull(AuthInput) },
			},
			resolve: async (source, args, { mutators }) => {
				return mutators.userLogin(args.input);
			},
		},
		taskCreate: {
			type: new GraphQLNonNull(TaskPayload),
			args: {
				input: { type: new GraphQLNonNull(TaskInput) },
			},
			resolve: async (source, args, { mutators, currentUser }) => {
				return mutators.taskCreate(args.input, currentUser);
			},
		},
	}),
});
