import { TaskStats } from "@/types";

interface UserTasksStatsProps {
  stats: TaskStats;
}

const UserTasksStats = ({ stats }: UserTasksStatsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">
        Task Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-primary-600">Total Tasks</p>
          <p className="text-xl font-semibold text-primary-700">
            {stats.totalTasks}
          </p>
        </div>
        <div>
          <p className="text-sm text-primary-600">Completed Tasks</p>
          <p className="text-xl font-semibold text-primary-700">
            {stats.completedTasks}
          </p>
        </div>
        <div>
          <p className="text-sm text-primary-600">Average Score</p>
          <p className="text-xl font-semibold text-primary-700">
            {stats.averageScore.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTasksStats;
