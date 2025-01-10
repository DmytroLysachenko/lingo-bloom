import { redirect } from "next/navigation";

const Test = async ({
  params,
}: {
  params: Promise<{ testId: string; taskIndex: string }>;
}) => {
  const { testId } = await params;

  return redirect(`/test/${testId}/0`);
};

export default Test;
