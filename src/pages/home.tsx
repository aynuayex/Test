import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-around items-center text-white">
      <h1 className="text-3xl font-bold">
        Welcome To Your <span className="text-[#ffa200]">Virtual Office</span>
      </h1>
      <div className=" flex gap-6">
        <Button
          className="bg-[#ffa200] rounded-xs"
          // onClick={() => navigate("/sign-in")}
        >
          Instant Demo
        </Button>
        <Button
          variant={"outline"}
          className="bg-black/50 rounded-xs"
          onClick={() => navigate("/office")}
        >
          Set Up Your Company
        </Button>
      </div>
    </div>
  );
}
