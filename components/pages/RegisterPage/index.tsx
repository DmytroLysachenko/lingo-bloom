import RegisterForm from "@components/organisms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-primary-700 font-heading">
        Register for Lingo Bloom
      </h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
