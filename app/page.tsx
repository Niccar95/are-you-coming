import Image from "next/image";
import SignInButton from "./components/SignInButton";

const HomePage = () => {
  return (
    <section className="min-h-[calc(100vh-3rem)] flex flex-col items-center text-center pt-32 lg:pt-0 lg:justify-center">
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
      <span className="animate-fade-in-up animation-delay-600">
        <SignInButton />
      </span>
    </section>
  );
};

export default HomePage;
