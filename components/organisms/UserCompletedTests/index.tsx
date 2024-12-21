import { CompletedTest } from "@/types";

interface UserCompletedTestsProps {
  tests: CompletedTest[];
}

const UserCompletedTests = ({ tests }: UserCompletedTestsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">
        Completed Tests
      </h3>
      <ul className="space-y-2">
        {tests.map((test) => (
          <li
            key={test.testId}
            className="flex justify-between items-center"
          >
            <span className="text-primary-600">Test {test.testId}</span>
            <span className="text-sm">
              <span className="font-medium text-secondary-600">
                {test.score}%
              </span>
              <span className="text-primary-500 ml-2">
                {new Date(test.completedAt).toLocaleDateString()}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCompletedTests;
