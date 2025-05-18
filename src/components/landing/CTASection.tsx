import React from "react";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="w-full max-w-4xl text-center space-y-6 bg-muted rounded-xl p-10 shadow-md">
      <h2 className="text-3xl font-bold">🚀 Ready to get started?</h2>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Join thousands of users who trust our platform for secure and fast
        communication. Sign up now and start chatting in seconds.
      </p>
      <div className="flex justify-center gap-4">
        <Button className="bg-primary  hover:bg-primary/90">
          Sign Up for Free
        </Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
};

export default CTASection;
