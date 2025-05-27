import { createChat } from "@/lib/actions/chatActions";
import { getAllUsers } from "@/lib/actions/profileAction";
import React from "react";

const RoomPage = async () => {
  const { data } = await getAllUsers();

  const chatCreation = async (formData: FormData) => {
    "use server";
    await createChat(formData);
  };

  if (!data) {
    return <div>No users found</div>;
  }
  return (
    <div className=" flex justify-center items-center min-h-screen flex-col gap-4">
      {data.map((user) => {
        return (
          <form
            action={chatCreation}
            className="text-2xl underline cursor-pointer"
            key={user.id}
          >
            <input
              type="text"
              name="receiverId"
              defaultValue={user.id}
              hidden
            />
            <button type="submit" className=" cursor-pointer">
              {user.full_name}
            </button>
          </form>
        );
      })}
    </div>
  );
};

export default RoomPage;
