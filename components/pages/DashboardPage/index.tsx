// import UserTasksStats from "@components/organisms/UserTasksStats";
import { Test } from "@/schemas";
import { User } from "@/types";
import UserCompletedTests from "@components/organisms/UserCompletedTests";
import UserCurrentTestProgress from "@components/organisms/UserCurrentTestProgress";
import UserProfile from "@components/organisms/UserProfile";
// import { TaskStats } from "@/types";

interface DashboardPageProps {
  user: User;
  tests: Test[];
  // taskStats: TaskStats;
}

const DashboardPage = async ({ user, tests }: DashboardPageProps) => {
  const currentTest = tests.find((test) => test.status === "in-progress");

  const completedTests = tests.filter((test) => test.status === "completed");

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh] flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-primary-700 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserProfile user={user} />
          {currentTest && <UserCurrentTestProgress test={currentTest} />}
          <UserCompletedTests tests={completedTests} />
          {/* <UserTasksStats stats={taskStats} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
