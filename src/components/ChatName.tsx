import React from "react";

type Props = {
  name: string;
  image: string;
};

function ChatName({ name, image }: Props) {
  return (
    <>
      <div className="text-2xl text-input-grey">{name}</div>
      <div className="w-[52px] h-full">
        <img src={image} alt={name} />
      </div>
    </>
  );
}

export default ChatName;
