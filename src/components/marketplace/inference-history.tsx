"use client";

import { AnimatedList } from "@/components/magicui/animated-list";
import { cn } from "@/lib/utils";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  status: "Verified" | "Processing" | "Failed";
}

const INITIAL_NOTIFICATIONS: Item[] = [
  {
    name: "Sentiment Analysis",
    description: "Request #42069 completed",
    time: "2m ago",
    icon: "🤖",
    color: "#00C9A7",
    status: "Verified",
  },
  {
    name: "Fraud Detection",
    description: "New Inference submitted",
    time: "10m ago",
    icon: "🔐",
    color: "#FFB800",
    status: "Processing",
  },
  {
    name: "Medical Risk",
    description: "Privacy proof verified",
    time: "15m ago",
    icon: "🔬",
    color: "#FF3D71",
    status: "Verified",
  },
];

let notifications = Array.from({ length: 4 }, () => INITIAL_NOTIFICATIONS).flat();

const Notification = ({ name, description, icon, color, time, status }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
          <div className={cn(
            "mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded w-fit tracking-wide",
            status === "Verified" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
          )}>
            {status}
          </div>
        </div>
      </div>
    </figure>
  );
};

export function InferenceHistory({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full flex-col p-6 overflow-hidden rounded-lg border border-[#1f272e] bg-[#0e141a] md:shadow-xl",
        className,
      )}
    >
      <h3 className="text-xl font-semibold mb-4 tracking-tight">Live inference activity</h3>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
