import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLFloat,
	GraphQLID,
} from "graphql";
import { SearchResultItem } from "../types/search-result-item";

import { Task } from "../types/taskMainListType";
import { Me } from "../types/userType";

const NumbersInRange = new GraphQLObjectType({
	name: "NumbersInRange",
	description: "to get sum and count",
	fields: {
		sum: {
			type: GraphQLNonNull(GraphQLInt),
		},
		count: {
			type: GraphQLNonNull(GraphQLInt),
		},
		avg: {
			type: GraphQLNonNull(GraphQLFloat),
		},
	},
});

export const Query = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		currentDateTime: {
			type: GraphQLNonNull(GraphQLString),
			resolve: () => {
				return new Promise((res) => {
					setTimeout(() => {
						res(new Date().toISOString());
					}, 5000);
				});
			},
		},
		sumNumbersInRange: {
			type: NumbersInRange,
			args: {
				begin: { type: new GraphQLNonNull(GraphQLInt) },
				end: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve: (source, { begin, end }) => {
				if (end < begin) {
					throw new Error("end cannot less than begin");
				}
				let sum = 0;
				let count = 0;
				let avg = 0;
				for (let i = begin; i < end; i++) {
					sum = sum + i;
					count = count + 1;
				}
				avg = sum / count;
				return { sum, count, avg: avg };
			},
		},
		taskMainList: {
			type: new GraphQLList(GraphQLNonNull(Task)),
			resolve: async (source, args, { loaders }) => {
				return loaders.taskBytypes.load("latest");
			},
		},
		taskInfo: {
			type: Task,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve: async (source, args, { loaders }) => {
				return loaders.tasks.load(args.id);
			},
		},
		search: {
			type: new GraphQLNonNull(
				new GraphQLList(new GraphQLNonNull(SearchResultItem)),
			),
			args: {
				searchTerm: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (source, args, { loaders }) => {
				return loaders.searchResults.load(args.searchTerm);
			},
		},
		me:{
			type:Me,
			resolve:(source,args,{currentUser})=>{
				return currentUser
			}
		}
	}),
});
