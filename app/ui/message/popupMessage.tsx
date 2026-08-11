"use client";

import { useState, useEffect } from "react";

export default function PopupMessage({ message, type }: { message: string, type: "error" | "success" }) {
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClose(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [message, type]);

  return (
    <>
      {!close &&
        <div className="fixed bottom-0 right-0 bg-mauve-200 flex justify-between m-5">
          <div className={`${type === "error" ? "bg-rose-500" : "bg-sky-400"} p-3`}></div>
          <span className={`${type === "error" ? "text-rose-500" : "text-sky-400"} text-2xl max-md:text-lg p-5 max-md:p-2`}>{message}</span>
        </div>
      }
    </>
  );
}