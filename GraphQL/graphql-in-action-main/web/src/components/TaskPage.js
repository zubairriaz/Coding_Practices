import React, { useState, useEffect } from 'react';

import { useStore } from '../store';
import NewApproach from './NewApproach';
import Approach, { APPROACH_FRAGMENT } from './Approach';
import TaskSummary, { TASK_SUMMARY_FRAGMENT } from './TaskSummary';
import { gql } from '@apollo/client';

/** GIA NOTES
 * Define GraphQL operations here...
 */
 const TASK_INFO = gql`
 query taskInfo($taskId: ID!) {
   taskInfo(id: $taskId) {
     id
     ...TaskSummary
     approach {
       id
       ...ApproachFragment
     }
   }
 }
 ${TASK_SUMMARY_FRAGMENT}
 ${APPROACH_FRAGMENT}
`;



export default function TaskPage({ taskId }) {
  const { query, AppLink } = useStore();
  const [taskInfo, setTaskInfo] = useState(null);
  const [showAddApproach, setShowAddApproach] = useState(false);
  const [highlightedApproachId, setHighlightedApproachId] = useState();

  useEffect(() => {
    if (!taskInfo) {
      query({query:TASK_INFO, variables: { taskId } }).then(
        ({ data }) => {
          setTaskInfo(data.taskInfo);
        },
      );

       // TODO: Replace mockTaskInfo with API_RESP_FOR_taskInfo
    }
  }, [taskId, taskInfo, query]);

  if (!taskInfo) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddNewApproach = (newApproach) => {
    setTaskInfo((pTask) => ({
      ...pTask,
      approachList: [newApproach, ...pTask.approachList],
    }));
    setHighlightedApproachId(newApproach.id);
    setShowAddApproach(false);
  };

  return (
    <div>
      <AppLink to="Home">{'<'} Home</AppLink>
      <TaskSummary task={taskInfo} />
      <div>
        <div>
          {showAddApproach ? (
            <NewApproach
              taskId={taskId}
              onSuccess={handleAddNewApproach}
            />
          ) : (
            <div className="center y-spaced">
              <button
                onClick={() => setShowAddApproach(true)}
                className="btn btn-secondary"
              >
                + Add New Approach
              </button>
            </div>
          )}
        </div>
        <h2>Approaches ({taskInfo.approach.length})</h2>
        {taskInfo.approach.map((appr) => (
          <div key={appr.id} id={appr.id}>
            <Approach
              approach={appr}
              isHighlighted={highlightedApproachId === appr.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
