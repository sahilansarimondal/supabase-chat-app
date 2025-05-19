import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-muted/50 to-transparent rounded-xl p-10 shadow-sm">
      <div className="space-y-6 max-w-xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium w-fit">
          <Zap className="h-4 w-4" />
          <span>New in 2025</span>
        </span>
        <h1 className="text-5xl font-bold tracking-tight leading-tight">
          The Future of Web Messaging
        </h1>
        <p className="text-muted-foreground text-lg">
          Experience seamless, secure, and lightning-fast communication — all
          within your browser. No downloads. No distractions.
        </p>
        <div className="flex items-center space-x-4">
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
            Get Started
          </Button>
          <Button variant="outline">Watch Demo</Button>
        </div>
      </div>

      <Card className="w-full md:w-[400px] mt-12 md:mt-0 p-4 shadow-md space-y-4">
        <div className="text-sm text-muted-foreground">Today</div>

        <div className="flex flex-col space-y-2">
          <div className="bg-muted px-3 py-2 rounded-md text-sm w-fit">
            Hey Alex! Are you joining the team meeting today?
          </div>
          <div className="bg-zinc-900 text-white px-3 py-2 rounded-md text-sm w-fit self-end">
            Yes, I&apos;ll be there in 5 minutes.
          </div>
          <div className="bg-muted px-3 py-2 rounded-md text-sm w-fit">
            Cool! Don&apos;t forget to mention the new feature updates.
          </div>
          <div className="bg-zinc-900 text-white px-3 py-2 rounded-md text-sm w-fit self-end">
            Got it, thanks!
          </div>
        </div>
      </Card>
    </section>
  );
};

export default HeroSection;
