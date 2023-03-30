import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ChatCard from "../components/ChatCard";
import supabase from "../supabase";
import { TChat, TKeeperLike } from "../types/animalShelter";
import { TUserProfile } from "../types/login";
import useAuth from "../utils/useAuth";

function Messages() {
  const [requests, setRequests] = useState<TKeeperLike[]>([]);
  const [chats, setChats] = useState<TChat[]>([]);
  const { profile, auth } = useAuth();
  const navigate = useNavigate();

  const getRequests = useCallback(async () => {
    const { data } = await supabase.rpc("getlikestatus", { shelter_id: profile?.id });
    setRequests(data || []);
  }, [profile?.id]);

  const getChats = useCallback(async () => {
    if (requests.length === 0) return;
    const { data: chatIds } = await supabase.from("chats").select("id, users:chat_users!inner(user_id)").eq("users.user_id", auth?.id);
    if (!chatIds) return;
    const { data: chatsData } = await supabase
      .from("chats")
      .select("*, users:chat_users!inner(user_id)")
      .in(
        "id",
        chatIds?.map((chat) => chat.id)
      );

    const { data: keepers } = await supabase.from("keepers").select("*");
    const { data: shelters } = await supabase.from("shelters").select("*").eq("user_id", auth?.id);

    if (!chatsData || !keepers || !shelters) return;
    const chatsWithUsers = chatsData.map((chat) => {
      const usersInChat = chat.users.map((user: TUserProfile) => {
        const keeperData = keepers.find((keeper) => keeper.user_id === user.user_id);
        if (keeperData) return keeperData;
        const shelterData = shelters.find((shelter) => shelter.user_id === user.user_id);
        if (shelterData) return shelterData;

        return null;
      });

      const like = requests.find((request) => request.id === chat.like_id);

      return { ...chat, users: usersInChat, request: like };
    });

    setChats(chatsWithUsers);
  }, [requests, auth?.id]);

  const createChat = async (user_id: string, like_id: number) => {
    if (!auth) return;
    const { data: keeperUser } = await supabase.from("keepers").select("user_id").eq("user_id", user_id).single();
    const { data: newChat } = await supabase.from("chats").insert({ like_id }).select().single();
    await supabase.from("chat_users").insert([
      { chat_id: newChat?.id, user_id: keeperUser?.user_id as string },
      { chat_id: newChat?.id, user_id: auth?.id },
    ]);
  };

  const handleApprove = async (like_id: number, user_id: string, status: string) => {
    if (!auth) return;
    await supabase.from("likes").update({ status }).eq("id", like_id);
    if (status === "Approved") {
      await createChat(user_id, like_id);
    }

    getRequests();
  };

  const openChat = (chat_id: number) => {
    navigate(`chat/${chat_id}`);
  };

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  useEffect(() => {
    if (requests.length > 0) {
      getChats();
    }
  }, [getChats, requests]);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col text-right">
          <h1 className="font-montserrat-bold text-2xl">Messages</h1>
          <p className="font-montserrat-regular text-input-grey ">Here you can approve keepers&apos; likes</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center w-[300px] md:w-[600px] lg:w-[900px] 2xl:w-[1200px] pb-12">
        {requests.length === 0 && <p className="font-montserrat-regular text-xl text-input-grey">No likes yet</p>}
        <div className="flex flex-wrap justify-center gap-4">
          {requests.length > 0 &&
            requests.map((request) => {
              if (request.status === "Pending") {
                return (
                  <ChatCard
                    key={request.id}
                    title={`${request.name} - ${request.firstName} ${request.lastName}`}
                    image={request.images[0]}
                    handleApprove={() => handleApprove(request.id, request.user_id, "Approved")}
                    handleReject={() => handleApprove(request.id, request.user_id, "Rejected")}
                  />
                );
              }
              return null;
            })}
          {chats.length > 0 &&
            chats.map((chat) => (
              <ChatCard
                key={chat.id}
                title={`${chat.request.name} - ${chat.users[0].firstName} ${chat.users[0].lastName}`}
                image={chat.request.images[0]}
                handleChat={() => openChat(chat.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Messages;
