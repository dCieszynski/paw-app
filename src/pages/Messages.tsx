import React, { useCallback, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import ChatCard from "../components/ChatCard";
import supabase from "../supabase";
import { TKeeperLike } from "../types/animalShelter";
import useAuth from "../utils/useAuth";

function Messages() {
  const [chats, setChats] = useState<TKeeperLike[]>([]);
  const { profile } = useAuth();

  const getChats = useCallback(async () => {
    const { data } = await supabase.rpc("getlikestatus", { shelter_id: profile?.id });
    setChats(data || []);
  }, [profile?.id]);

  const handleApprove = async (like_id: number, status: string) => {
    await supabase.from("likes").update({ status }).eq("id", like_id);
    getChats();
  };

  useEffect(() => {
    getChats();
  }, [getChats]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col text-right">
          <h1 className="font-montserrat-bold text-2xl">Messages</h1>
          <p className="font-montserrat-regular text-input-grey ">Here you can approve keepers&apos; likes</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center w-[300px] pb-12">
        {chats.length === 0 && <p className="font-montserrat-regular text-xl text-input-grey">No chats yet</p>}
        {/* eslint-disable react/jsx-no-useless-fragment */}
        {chats.length > 0 &&
          chats.map((chat) => (
            <div key={chat.id}>
              {chat.status !== "Rejected" && (
                <ChatCard
                  title={`${chat.name} - ${chat.firstName} ${chat.lastName}`}
                  image={chat.images[0]}
                  status={chat.status}
                  handleApprove={() => handleApprove(chat.id, "Approved")}
                  handleReject={() => handleApprove(chat.id, "Rejected")}
                />
              )}
            </div>
          ))}
      </div>
      {/* eslint-enable react/jsx-no-useless-fragment */}
    </>
  );
}

export default Messages;
