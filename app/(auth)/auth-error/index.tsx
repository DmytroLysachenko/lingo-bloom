import { useRouter } from "next/router";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password. Please try again.",
  Configuration: "There was a configuration error. Please contact support.",
  AccessDenied: "You do not have permission to sign in.",
  Default: "An unexpected error occurred. Please try again later.",
};

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessage = errorMessages[error as string] || errorMessages.Default;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Sign-in Error</h1>
      <p>{errorMessage}</p>
      <Link href="/auth/signin">Go back to Sign In</Link>
    </div>
  );
}
