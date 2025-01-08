// import UserTasksStats from "@components/organisms/UserTasksStats";
import UserCompletedTests from "@components/organisms/UserCompletedTests";
import UserCurrentTestProgress from "@components/organisms/UserCurrentTestProgress";
import UserProfile from "@components/organisms/UserProfile";
// import { TaskStats } from "@/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { findAllTests } from "@/db/test";
import { testArraySchema } from "@/schemas/testScheme";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) return redirect("/login");

  const tests = await findAllTests(session.user.id);

  const parsedTests = testArraySchema.parse(tests);

  const currentTest = parsedTests.find((test) => test.status === "in-progress");

  const completedTests = parsedTests.filter(
    (test) => test.status === "completed"
  );

  // const taskStats: TaskStats = {
  //   totalTasks: 500,
  //   completedTasks: completedTests.reduce(
  //     (acc, test) => acc + test.totalTasks,
  //     0
  //   ),
  //   averageScore:
  //     completedTests.reduce((acc, test) => acc + Number(test.score), 0) /
  //     completedTests.length,
  // };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh] flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-primary-700 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserProfile user={session.user} />
          <UserCurrentTestProgress test={currentTest} />
          <UserCompletedTests tests={completedTests} />
          {/* <UserTasksStats stats={taskStats} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
