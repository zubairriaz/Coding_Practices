import pgClient from "./pg-client";
import sqls from "./sqls";

export default async function pgApiWrapper() {
	const { pgPool } = await pgClient();
	const pgQuery = (text, params = {}) => {
		return pgPool.query(text, Object.values(params));
	};

	return {
		mutators: {
			userDelete: async ({ currentUser }) => {
				const payload = { errors: [] };
				try {
					await pgQuery(sqls.userDelete, {
						$1: currentUser.id,
					});
					payload.deletedUserId = currentUser.id;
				} catch (err) {
					payload.errors.push({
						message: "We were not able to delete this account",
					});
				}

				return payload;
			},
			approachCreate: async ({
				taskId,
				input,
				mutators,
				currentUser,
			}) => {
				const payload = { errors: [] };
				if (payload.errors.length === 0) {
					const pgResp = await pgQuery(sqls.approachInsert, {
						$1: currentUser.id,
						$2: input.content,
						$3: taskId,
					});
					if (pgResp.rows[0]) {
						payload.Approach = pgResp.rows[0];
						await pgQuery(sqls.approachCountIncrement, {
							$1: taskId,
						});
						await mutators.approachDetailCreate(
							payload.Approach.id,
							input.detailList,
						);
					}
				}

				return payload;
			},
			taskCreate: async (input, currentUser) => {
				const { content, tags, isPrivate } = input;
				let payload = { errors: [] };
				if (content.length < 15) {
					payload.errors.push({ message: "content is too short" });
				}
				const pgResp = await pgQuery(sqls.taskInsert, {
					$1: currentUser.id,
					$2: content,
					$3: tags.join(","),
					$4: isPrivate,
				});
				console.log(pgResp.rows);
				if (pgResp.rows[0]) {
					payload.Task = pgResp.rows[0];
				}
				return payload;
			},
			userCreate: async (input) => {
				console.log(input.password, input.username);
				const payload = { errors: [] };
				if (input.password.length < 6) {
					payload.errors.push({
						message: "Passowrd cannnot be less than six characters",
					});
				}
				if (payload.errors.length == 0) {
					const authtoken = "rye&5656jncksiKDSDSFHKlskjiIIikj";
					const pgResp = await pgQuery(sqls.userInsert, {
						$1: input.username.toLowerCase(),
						$2: input.password,
						$3: input.firstName,
						$4: input.lastName,
						$5: authtoken,
					});
					if (pgResp.rows[0]) {
						payload.User = pgResp.rows[0];
						payload.authtoken = authtoken;
					}
				}
				return payload;
			},
			userLogin: async (input) => {
				const { username, password } = input;
				const payload = { errors: [] };
				if (!username || !password) {
					payload.errors.push({
						message: "Inavalid username or password",
					});
				}
				if (payload.errors.length == 0) {
					const authtoken = "rye&5656jncksiKDSDSFHKlsk=login=";
					const pgResp = await pgQuery(sqls.userFromCredentials, {
						$1: input.username.toLowerCase(),
						$2: input.password,
					});
					const user = pgResp.rows[0];
					if (user) {
						await pgQuery(sqls.userUpdateAuthToken, {
							$1: user.id,
							$2: authtoken,
						});
						payload.User = user;
						payload.authtoken = authtoken;
					} else {
						payload.errors.push({
							message: "Inavalid username or passowrd",
						});
					}
				}
				return payload;
			},
		},
		loaders: {
			tasksForUser: async (userIds) => {
				console.log(userIds);
				const pgResp = await pgQuery(sqls.tasksForUsers, {
					$1: userIds,
				});
				return userIds.map((userid) =>
					pgResp.rows.filter((row) => row.userId == userid),
				);
			},
			userByAuthToken: async (authtoken) => {
				if (!authtoken) {
					return null;
				}
				const pgResp = await pgQuery(sqls.userFromAuthToken, {
					$1: authtoken,
				});
				return pgResp.rows[0];
			},
			searchResults: async (searchTerms, user) => {
				let result = searchTerms.map(async (searchTerm) => {
					const resp = await pgQuery(sqls.searchResults, {
						$1: searchTerm,
						$2: user ? user.id : null,
					});
					return resp.rows;
				});
				return Promise.all(result);
			},
			taskBytypes: async (types) => {
				let result = types.map(async (type) => {
					if (type == "latest") {
						const resp = await pgQuery(sqls.tasksLatest);
						return resp.rows;
					} else {
						throw new Error("Type not valid");
					}
				});
				return Promise.all(result);
			},
			taskInfo: async (taskIds, user) => {
				const resp = await pgQuery(sqls.tasksFromIds, {
					$1: taskIds,
					$2: user ? user.id : null,
				});
				return taskIds.map((taskId) =>
					resp.rows.find((row) => row.id == taskId),
				);
			},
			userInfo: async (userIds) => {
				const resp = await pgQuery(sqls.usersFromIds, { $1: userIds });

				return userIds.map((userId) =>
					resp.rows.find((row) => row.id === userId),
				);
			},
			approachInfo: async (taskids) => {
				const resp = await pgQuery(sqls.approachesForTaskIds, {
					$1: taskids,
				});

				let result = taskids.map((taskId) =>
					resp.rows.filter((row) => row.taskId === taskId),
				);

				return result;
			},
		},
	};
}
