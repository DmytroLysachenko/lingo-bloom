import {
  ConnectionTaskType,
  FillInBlankTaskType,
  Task,
  TestTaskType,
  TestTextTaskType,
} from "@/schemas";
import MultipleChoiceTask from "@components/molecules/MultipleChoiceTask";
import TextTask from "@components/molecules/TextTask";
import ConnectionTask from "@components/molecules/ConnectionTask";
import FillInBlankTask from "@components/molecules/FillInBlankTask";

interface TaskIntefaceProps {
  task: Task;
}

const TaskInteface = ({ task }: TaskIntefaceProps) => {
  const renderTask = () => {
    if ("text" in task.data) {
      return <TextTask task={task as TestTextTaskType} />;
    } else if ("matches" in task.data) {
      return <ConnectionTask task={task as ConnectionTaskType} />;
    } else if ("blanks" in task.data) {
      return <FillInBlankTask task={task as FillInBlankTaskType} />;
    } else if ("answers" in task.data && !("text" in task.data)) {
      return <MultipleChoiceTask task={task as TestTaskType} />;
    }

    return <div>Unknown task type</div>;
  };

  return renderTask();
};

export default TaskInteface;
