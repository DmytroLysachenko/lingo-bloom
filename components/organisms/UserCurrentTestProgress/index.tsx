import { TestProgress } from "@/types";

interface UserCurrentTestProgressProps {
  progress: TestProgress;
}

const UserCurrentTestProgress = ({
  progress,
}: UserCurrentTestProgressProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">
        Current Test Progress
      </h3>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-primary-600">Progress</span>
          <span className="text-sm font-medium text-primary-600">
            {progress.progress}%
          </span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-2.5">
          <div
            className="bg-secondary-500 h-2.5 rounded-full"
            style={{ width: `${progress.progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-primary-600">
        Completed {progress.completedTasks} out of {progress.totalTasks} tasks
      </p>
    </div>
  );
};

export default UserCurrentTestProgress;
