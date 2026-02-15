import Image from "next/image";
import SignInButton from "./components/SignInButton";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <Image
          src="/are-you-coming-logo-light-q.svg"
          alt="Are You Coming?"
          width={240}
          height={87}
          className="mb-2 animate-fade-in-up"
        />
        <p className="text-zinc-500 text-sm mb-6 animate-fade-in-up animation-delay-300">
          Sign in to get started
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
