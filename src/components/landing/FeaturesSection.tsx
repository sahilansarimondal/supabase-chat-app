import { Rocket, Send, ShieldCheck } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full max-w-6xl space-y-8">
      <h2 className="text-3xl font-bold text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 text-center space-y-4">
          <Send className="mx-auto h-10 w-10 text-primary" />
          <div className="text-lg font-semibold">Real-Time Messaging</div>
          <p className="text-sm text-muted-foreground">
            Send and receive messages instantly across devices.
          </p>
        </Card>

        <Card className="p-6 text-center space-y-4">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <div className="text-lg font-semibold">End-to-End Encryption</div>
          <p className="text-sm text-muted-foreground">
            Keep your conversations private and secure with encryption.
          </p>
        </Card>

        <Card className="p-6 text-center space-y-4">
          <Rocket className="mx-auto h-10 w-10 text-primary" />
          <div className="text-lg font-semibold">Fast and Responsive</div>
          <p className="text-sm text-muted-foreground">
            Enjoy lightning-fast performance with zero lag.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
