import React from "react";

const PersonalRoom = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>this is personal room and the user id is {id}</div>;
};

export default PersonalRoom;
