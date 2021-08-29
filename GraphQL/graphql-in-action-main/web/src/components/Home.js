import { gql, useQuery } from "@apollo/client";
import React from "react";

import Search from "./Search";
import TaskSummary, { TASK_SUMMARY_FRAGMENT } from "./TaskSummary";

/** GIA NOTES
 * Define GraphQL operations here...
 */

const Task_MAIN_LIST = gql`
	query TaskMainList {
		taskMainList {
			id
			...TaskSummary
		}
	}
	${TASK_SUMMARY_FRAGMENT}
`;

export default function Home() {
	const { loading, data } = useQuery(Task_MAIN_LIST);

	

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div>
			<Search />
			<div>
				<h1>Latest</h1>
				{data.taskMainList.map((task) => (
					<TaskSummary key={task.id} task={task} link={true} />
				))}
			</div>
		</div>
	);
}
