import React from "react";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function ChatFrom({ onSubmit, value, onChange }: Props) {
  return (
    <form className="flex flex-col items-center w-full gap-3" onSubmit={onSubmit}>
      <label htmlFor="content" className="outline-paw-green-2 h-[80px] w-full border-t-4 border-t-paw-green-3">
        <textarea
          name="content"
          id="content"
          value={value}
          onChange={onChange}
          className="outline-paw-green-2 w-full h-full p-2 bg-input-grey-2 resize-none"
        />
      </label>
      <button
        type="submit"
        className="w-[100px] h-[50px] bg-paw-green-2 text-xl font-montserrat-bold text-white rounded-xl transition-all ease-in hover:border-4 hover:border-paw-green-3"
      >
        Send
      </button>
    </form>
  );
}

export default ChatFrom;
