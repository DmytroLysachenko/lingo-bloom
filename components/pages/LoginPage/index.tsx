import LoginForm from "@components/organisms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-primary-700 font-heading">
        Login to Lingo Bloom
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
