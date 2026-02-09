import SignInButton from "./components/SignInButton";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <SignInButton />
      </div>
    </div>
  );
};

export default HomePage;
