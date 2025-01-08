import { TestArray } from "@/schemas/testScheme";

interface UserCompletedTestsProps {
  tests: TestArray;
}

const UserCompletedTests = ({ tests }: UserCompletedTestsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">
        Completed Tests
      </h3>
      {tests.length === 0 ? (
        <div className="text-center text-gray-500 my-8">
          No completed tests yet. Once you finish a test, it will appear here.
        </div>
      ) : (
        <ul className="space-y-2">
          {tests.map((test) => (
            <li
              key={test.id}
              className="flex justify-between items-center"
            >
              <span className="text-primary-600">Test {test.id}</span>
              <span className="text-sm">
                <span className="font-medium text-secondary-600">
                  {test.score}%
                </span>
                <span className="text-primary-500 ml-2">
                  {test.completedAt!.toLocaleDateString()}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCompletedTests;
