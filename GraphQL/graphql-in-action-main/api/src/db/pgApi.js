import pgClient from "./pg-client";
import sqls from "./sqls";

export default async function pgApiWrapper() {
	const { pgPool } = await pgClient();
	const pgQuery = (text, params = {}) => {
		return pgPool.query(text, Object.values(params));
	};

	return {
		taskMainList: async () => {
			const resp = await pgQuery(sqls.tasksLatest);
			return resp.rows;
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
	};
}
