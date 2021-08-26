import {
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { ApproachDetails } from "./approach-details";
import { SearchResultItem } from "./search-result-item";
import { Task } from "./taskMainListType";
import { Author } from "./userType";

export const Approach = new GraphQLObjectType({
	name: "Approach",
	description: "To get Approach Information",
	interfaces:()=>[SearchResultItem],
	fields: ()=>({
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
			resolve: (source, args, { loaders }) =>
				loaders.users.load(source.userId),
		},
		task:{
			type: new GraphQLNonNull(Task),
			resolve: (source, args, { loaders }) =>
				loaders.tasks.load(source.taskId),
		},
		detailList:{
			type:new GraphQLNonNull(new GraphQLList(ApproachDetails)),
			resolve:(source, args,{loaders})=>{
				return loaders.detailsList.load(source.id)
			}
		}
	})
});
