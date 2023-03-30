import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ChatCard from "../components/ChatCard";
import supabase from "../supabase";
import { TUserProfile } from "../types/login";
import useAuth from "../utils/useAuth";

function Chats() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getChats = useCallback(async () => {
    const { data: chatIds } = await supabase.from("chats").select("id, users:chat_users!inner(user_id)").eq("users.user_id", auth?.id);
    if (!chatIds) return;
    const { data: chatsData } = await supabase
      .from("chats")
      .select("*, users:chat_users!inner(user_id)")
      .in(
        "id",
        chatIds?.map((chat) => chat.id)
      );

    const { data: keepers } = await supabase.from("keepers").select("*").eq("user_id", auth?.id);
    const { data: shelters } = await supabase.from("shelters").select("*");

    if (!chatsData || !keepers || !shelters) return;
    const chatsWithUsers = chatsData.map(async (chat) => {
      const usersInChat = chat.users.map((user: TUserProfile) => {
        const keeperData = keepers.find((keeper) => keeper.user_id === user.user_id);
        if (keeperData) return keeperData;
        const shelterData = shelters.find((shelter) => shelter.user_id === user.user_id);
        if (shelterData) return shelters;

        return null;
      });

      const { data: like } = await supabase.from("likes").select("*").eq("id", chat.like_id).single();
      const { data: animal } = await supabase.from("animals").select("*").eq("id", like?.animal_id).single();

      return { ...chat, users: usersInChat, animal };
    });

    const chatsWithUsersResolved = await Promise.all(chatsWithUsers);
    setChats(chatsWithUsersResolved);
  }, [auth?.id]);

  const openChat = (chat_id: number) => {
    navigate(`chat/${chat_id}`);
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
          <p className="font-montserrat-regular text-input-grey ">Here are yours chats</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center w-[300px] md:w-[600px] lg:w-[900px] 2xl:w-[1200px] pb-12">
        {chats.length === 0 && <p className="font-montserrat-regular text-xl text-input-grey">No chats yet</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {chats.length > 0 &&
            chats.map((chat) => (
              <ChatCard
                key={chat.id}
                title={`${chat.users[0].firstName} ${chat.users[0].lastName}- ${chat.users[1].name} `}
                image={chat.animal?.images[0]}
                handleChat={() => openChat(chat.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Chats;
