import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
    GraphQLFloat,
    printSchema
} from "graphql";


const NumbersInRange = new GraphQLObjectType({
	name: "NumbersInRange",
    description:"to get sum and count",
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


export const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			currentDateTime: {
				type: GraphQLNonNull(GraphQLString),
				resolve: () => {
                    return new Promise((res)=>{
                        setTimeout(()=>{
                          res(new Date().toISOString())
                        },5000)
                    })
				},
			},
			sumNumbersInRange: {
				type: NumbersInRange,
				args: {
					begin: { type: new GraphQLNonNull(GraphQLInt) },
					end: { type: new GraphQLNonNull(GraphQLInt) },
				},
				resolve: (source, { begin, end }) => {
                    if(end < begin){
                        throw new Error("end cannot less than begin")
                    }
					let sum = 0;
                    let count = 0;
                    let avg = 0;
					for (let i = begin; i < end; i++) {
						sum = sum + i;
                        count = count + 1;
					}
                    avg = sum/count;
					return {sum, count, avg:avg};
				},
			},
		},
	}),
});

console.log(printSchema(schema))
