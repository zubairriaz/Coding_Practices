import {
	GraphQLID,
	GraphQLInterfaceType,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Approach } from "./approachType";
import { Task } from "./taskMainListType";

export const SearchResultItem = new GraphQLInterfaceType({
	name: "SearchResultItem",
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		content: { type: GraphQLNonNull(GraphQLString) },
	}),
	resolveType(obj) {
		if (obj.type == "task") {
			return Task;
		} else if (obj.type == "approach") {
			return Approach;
		}
	},
});
