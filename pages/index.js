import { useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";

const Home = () => {
  const router = useRouter();

  const handleExplore = () => {
    router.push("/Login");
  };

  useEffect(() => {
    document.title = "Welcome to ChatSphere!";
  }, [router]);

  return (
    <div>
      <div className="h-[100vh] flex bg-c1">
        <div className="flex items-center flex-col mt-32">
          <Logo />
          <h1 className="font-semibold mt-5 text-4xl">Welcome to ChatSphere</h1>
          <p className="ml-32 mr-32 mt-8 text-center">
            Chatsphere is an innovative messaging app that revolutionizes the way people communicate
            and connect with each other. Designed to provide a seamless and immersive chat experience,
            Chatsphere combines cutting-edge features with a user-friendly interface to create a
            platform that caters to the needs and preferences of modern users. The app's intuitive and
            visually appealing interface makes navigating through conversations effortless. Chatsphere
            offers a range of customization options, enabling users to personalize their chat
            experience with themes, stickers, and emojis. Users can also create group chats for
            collaborative discussions or plan events with ease.
          </p>
          <div className=" mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/6 h-14 rounded-md cursor-pointer p-[1px]">
            <div onClick={() => handleExplore()} className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <span>Explore ChatSphere</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
