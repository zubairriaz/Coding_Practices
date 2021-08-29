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
//import {Auth} from "googleapis"


// const oAuthClient = new Auth.OAuth2Client(
// 	"918970319267-1dmprut658qpkad0gtg83krnqpvbloah.apps.googleusercontent.com",
// 	"-vNFzayFEkUBmv3RrtPGtAAz",
// 	"http://localhost:3000"
// )
// const scopes = [
// 	'https://www.googleapis.com/auth/blogger',
// 	'https://www.googleapis.com/auth/calendar'
//   ];
  
//   const url = oAuthClient.generateAuthUrl({
// 	// 'online' (default) or 'offline' (gets refresh_token)
// 	access_type: 'offline',
  
// 	// If you only need one scope you can pass it as a string
// 	scope: scopes
//   });
async function main() {
	// let code = "4/0AX4XfWg-wc7nz--NtypT0lu2PjMtdQ971sDANgE2IRHPzXA23Sie0N25EkS7jw8b-m8DLw"
	// const {tokens} = await oAuthClient.getToken(code)
	// console.log(tokens)
    //  oAuthClient.setCredentials(tokens);
	const pgApi = await pgApiWrapper();
	const mongoApi = await mongoApiWrapper();
	const server = express();
	server.use(cors());
	server.use(morgan("dev"));
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use("/:fav.ico", (req, res) => res.sendStatus(204));

	const mutators = { ...pgApi.mutators, ...mongoApi.mutators };
	const loaders= (user) => ({
		users: new DataLoader((userIds) => pgApi.loaders.userInfo(userIds)),
		approaches: new DataLoader((taskIds) =>
			pgApi.loaders.approachInfo(taskIds),
		),
		tasks: new DataLoader((taskIds) => pgApi.loaders.taskInfo(taskIds,user)),
		taskBytypes: new DataLoader((type) => pgApi.loaders.taskBytypes(type)),
		searchResults: new DataLoader((searchTerms) =>
			pgApi.loaders.searchResults(searchTerms,user),
		),
		detailsList: new DataLoader((ids) => mongoApi.loaders.detailLists(ids)),
		tasksForUser: new DataLoader((userIds) => pgApi.loaders.tasksForUser(userIds)),
	});

	// Example route
	server.use("/", async (req, res) => {

	
		const authToken =
			req && req.headers && req.headers.authorization
				? req.headers.authorization.slice(7)
				: null;
				console.log(authToken)
    const currentUser = await pgApi.loaders.userByAuthToken(authToken) ;
    console.log("xxxxxx",currentUser)
    if(!currentUser && authToken){
      res.status(401).send({errors:{message:"Invalid access token"}})
    }  
		graphqlHTTP({
			schema,
			context: { pgApi, loaders:{...loaders(currentUser)}, mutators, currentUser },
			graphiql: { headerEditorEnabled: true },
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
