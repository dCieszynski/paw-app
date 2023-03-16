import React from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

type Props = {
  image: string;
  title: string;
  status: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  handleApprove: (params: any) => void;
  handleReject: (params: any) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

function ChatCard({ image, title, status, handleApprove, handleReject }: Props) {
  return (
    <div className="flex justify-between items-center w-[295px] h-16 border-2 border-paw-green-2 rounded-xl shadow-md px-2">
      <div className="h-12 w-12">
        <img
          className="w-full h-full rounded object-cover
            "
          src={image}
          alt={title}
        />
      </div>
      <div className="h-full w-[130px] flex items-center font-montserrat-bold">{title}</div>
      <div className="flex text-[2rem] gap-3">
        {status === "Approved" && <IoMdChatbubbles className="text-paw-green-3" />}
        {status === "Pending" && (
          <>
            <button type="button" onClick={handleApprove}>
              <MdCheck className="text-paw-green-2" />
            </button>
            <button type="button" onClick={handleReject}>
              <MdClose className="text-red" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatCard;
