import React from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

type Props = {
  image: string;
  title: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  handleApprove?: (params: any) => void;
  handleReject?: (params: any) => void;
  handleChat?: (params: any) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

const defaultProps = {
  handleApprove: undefined,
  handleReject: undefined,
  handleChat: undefined,
};

function ChatCard({ image, title, handleApprove, handleReject, handleChat }: Props) {
  return (
    <div className="flex justify-between items-center w-[295px] h-16 border-2 border-paw-green-2 rounded-xl shadow-md px-2">
      <div className="h-12 w-12">
        <img className="w-full h-full rounded object-cover" src={image} alt={title} />
      </div>
      <div className="h-full w-[130px] flex items-center font-montserrat-bold">{title}</div>
      <div className="flex text-[2rem] gap-2 w-[78px]">
        {handleChat !== undefined && (
          <button
            type="button"
            onClick={handleChat}
            className="w-full flex justify-center text-center border-2 border-transparent transition-all ease-in text-paw-blue-0 hover:border-2 hover:rounded-xl hover:border-paw-green-3"
          >
            <IoMdChatbubbles />
          </button>
        )}
        {handleApprove !== undefined && handleReject !== undefined && (
          <>
            <button
              type="button"
              onClick={handleApprove}
              className="w-9 text-center border-2 border-transparent transition-all ease-in hover:border-2 hover:rounded-xl hover:border-paw-green-3"
            >
              <MdCheck className="text-paw-green-2" />
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="w-9 text-center border-2 border-transparent transition-all ease-in hover:border-2 hover:rounded-xl hover:border-red"
            >
              <MdClose className="text-red" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

ChatCard.defaultProps = defaultProps;

export default ChatCard;
