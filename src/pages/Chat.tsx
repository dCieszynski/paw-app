import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import supabase from "../supabase";
import { TAnimal } from "../types/animalShelter";
import { TMessage } from "../types/chat";
import { TUserProfile } from "../types/login";
import useAuth from "../utils/useAuth";
import ChatMessages from "../components/ChatMessages";
import ChatFrom from "../components/ChatFrom";
import ChatName from "../components/ChatName";

function Chat() {
  const { id } = useParams();
  const { profile } = useAuth();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [shelter, setShelter] = useState<TUserProfile | null>(null);
  const [keeper, setKeeper] = useState<TUserProfile | null>(null);
  const [animal, setAnimal] = useState<TAnimal | null>(null);

  const getAnimal = useCallback(async () => {
    if (!id) return;
    const { data: chat } = await supabase.from("chats").select("*").eq("id", id).single();
    const { data: likes } = await supabase.from("likes").select("*").eq("id", chat.like_id).single();
    const { data: animalData } = await supabase.from("animals").select("*").eq("id", likes?.animal_id).single();
    setAnimal(animalData);
  }, [id]);

  const getUsers = useCallback(async () => {
    if (!id) return;
    const { data } = await supabase.from("chat_users").select("user_id").eq("chat_id", id);
    if (!data) return;
    data.forEach(async (user) => {
      const { data: keeperData } = await supabase.from("keepers").select("*").eq("user_id", user.user_id).single();
      if (!keeperData) {
        const { data: shelterData } = await supabase.from("shelters").select("*").eq("user_id", user.user_id).single();
        setShelter(shelterData);
      } else {
        setKeeper(keeperData);
      }
    });
  }, [id]);

  const getMessages = useCallback(async () => {
    const { data } = await supabase.from("messages").select("*").eq("chat_id", id);
    setMessages(data || []);
  }, [id]);

  const sendMessage = async (content: string) => {
    if (content.length === 0) return;
    await supabase.from("messages").insert([{ author_id: profile?.user_id, chat_id: id, content }]);
  };

  const watchMessages = useCallback(async () => {
    await getMessages();

    supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, async () => {
        await getMessages();
      })
      .subscribe();
  }, [getMessages]);

  const unsubscribe = async () => {
    await supabase.channel("custom-all-channel").unsubscribe();
  };

  useEffect(() => {
    watchMessages();

    return () => {
      unsubscribe();
    };
  }, [watchMessages]);

  useEffect(() => {
    getAnimal();
  }, [getAnimal]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values) => {
      await sendMessage(values.content);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <BackButton />
        <div className="flex flex-col text-right">
          <h1 className="font-montserrat-bold text-2xl">Chat</h1>
          <p className="font-montserrat-regular text-input-grey ">Here you can chat with others</p>
        </div>
      </div>
      {!animal || !keeper || !shelter ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center w-[300px] md:w-[600px] lg:w-[900px] 2xl:w-[1200px] border-x-[1px] border-x-paw-green-1 border-b-[1px] border-b-paw-green-1 pb-6 rounded">
          <div className="h-[300px] w-full">
            <div className="w-full flex justify-between items-center border-y-[1px] border-y-paw-green-1 bg-paw-green-1 px-2">
              <div className="flex h-full items-center justify-center gap-3">
                {shelter?.user_id !== profile?.user_id && shelter?.name && <ChatName name={shelter?.name} image={shelter?.avatarImageSrc} />}
                {keeper?.user_id !== profile?.user_id && keeper && <ChatName name={`${keeper?.firstName}`} image={keeper?.avatarImageSrc} />}
              </div>
              <div className="flex items-center gap-3">
                {animal?.name && animal?.images[0] && <ChatName name={animal?.name} image={animal?.images[0]} />}
              </div>
            </div>
            <ChatMessages messages={messages} />
          </div>
          <ChatFrom onSubmit={formik.handleSubmit} onChange={formik.handleChange} value={formik.values.content} />
        </div>
      )}
    </>
  );
}

export default Chat;
