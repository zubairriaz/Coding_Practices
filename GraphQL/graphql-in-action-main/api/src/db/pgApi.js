import pgClient from "./pg-client";
import sqls from "./sqls";

export default async function pgApiWrapper() {
	const { pgPool } = await pgClient();
	const pgQuery = (text, params = {}) => {
		return pgPool.query(text, Object.values(params));
	};

	return {
        mutators:{

        },
		loaders: {
			searchResults: async (searchTerms) => {
				let result = searchTerms.map(async (searchTerm) => {
					const resp = await pgQuery(sqls.searchResults, {
						$1: searchTerm,
						$2: null,
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
			taskInfo: async (taskIds) => {
				const resp = await pgQuery(sqls.tasksFromIds, {
					$1: taskIds,
					$2: null,
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


