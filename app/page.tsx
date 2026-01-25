import SignIn from "./components/SignIn";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default HomePage;
