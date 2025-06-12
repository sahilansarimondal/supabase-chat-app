import { Card, CardContent, CardFooter } from "@/components/ui/card";

import React from "react";

const RoomPage = async () => {
  return (
    <>
      <Card className="flex justify-center items-center flex-col h-screen">
        <CardContent className=""> Select a Chat to continue </CardContent>
        <CardFooter className="mt-4"></CardFooter>
      </Card>
    </>
  );
};

export default RoomPage;
