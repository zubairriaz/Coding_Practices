/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server
 */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";

import * as config from "./config";
import { schema } from "./schema";
import pgApiWrapper from "./db/pgApi";
import DataLoader from "dataloader";
import { mongoApiWrapper } from "./db/mongoApi";

async function main() {
	const pgApi = await pgApiWrapper();
	const mongoApi = await mongoApiWrapper();
	const server = express();
	server.use(cors());
	server.use(morgan("dev"));
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use("/:fav.ico", (req, res) => res.sendStatus(204));

	const mutators = { ...pgApi.mutators, ...mongoApi.mutators };

	// Example route
	server.use("/", (req, res) => {
		const loaders = {
			users: new DataLoader((userIds) => pgApi.loaders.userInfo(userIds)),
			approaches: new DataLoader((taskIds) =>
				pgApi.loaders.approachInfo(taskIds),
			),
			tasks: new DataLoader((taskIds) => pgApi.loaders.taskInfo(taskIds)),
			taskBytypes: new DataLoader((type) =>
				pgApi.loaders.taskBytypes(type),
			),
			searchResults: new DataLoader((searchTerms) =>
				pgApi.loaders.searchResults(searchTerms),
			),
			detailsList: new DataLoader((ids) => mongoApi.detailLists(ids)),
		};
		graphqlHTTP({
			schema,
			context: { pgApi, loaders, mutators },
			graphiql: true,
			customFormatErrorFn: (err) => {
				const errorReport = {
					message: err.message,
					locations: err.locations,
					stack: err.stack ? err.stack.split("\n") : [],
					path: err.path,
				};
				console.error("GraphQL Error", errorReport);
				return config.isDev
					? errorReport
					: { message: "Oops! Something went wrong! :(" };
			},
		})(req, res);
	});

	// This line rus the server
	server.listen(config.port, () => {
		console.log(`Server URL: http://localhost:${config.port}/`);
	});
}

main();
