import UserTasksStats from "@components/organisms/UserTasksStats";
import UserCompletedTests from "@components/organisms/UserCompletedTests";
import UserCurrentTestProgress from "@components/organisms/UserCurrentTestProgress";
import UserProfile from "@components/organisms/UserProfile";
import { CompletedTest, TaskStats, TestProgress, User } from "@/types";

const DashboardPage = () => {
  // In a real application, you would fetch this data from your API
  const user: User = {
    id: "cm4y1ge6x0000u6kof3muzu2k",
    name: "Dmytro Lysachenko",
    email: "dlysachenko98@gmail.com",
    emailVerified: null,
    image: "https://avatars.githubusercontent.com/u/157533371?v=4",
    createdAt: "2024-12-21T10:30:33.944Z",
    updatedAt: "2024-12-21T10:30:33.944Z",
  };

  const currentTestProgress: TestProgress = {
    testId: "123",
    progress: 60,
    totalTasks: 10,
    completedTasks: 6,
  };

  const completedTests: CompletedTest[] = [
    { testId: "101", score: 85, completedAt: "2024-12-20" },
    { testId: "102", score: 90, completedAt: "2024-12-18" },
  ];

  const taskStats: TaskStats = {
    totalTasks: 500,
    completedTasks: 350,
    averageScore: 87.5,
    triesPerTask: 1.3,
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh] flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-primary-700 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserProfile user={user} />
          <UserCurrentTestProgress progress={currentTestProgress} />
          <UserCompletedTests tests={completedTests} />
          <UserTasksStats stats={taskStats} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
