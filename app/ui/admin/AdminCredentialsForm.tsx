"use client";

import { changeCredentials } from "@/app/lib/actions";
import { useState, useActionState } from "react";
import PopupMessage from "../message/popupMessage";
import { PopupMessageState } from "@/app/lib/data";

export default function AdminCredentialsForm({ email }: { email: string }) {
  const [editingCreds, setEditingCreds] = useState(false);
  const [state, formAction] = useActionState(changeCredentials, {} as PopupMessageState);
  const [emailInput, setEmailInput] = useState(email);

  return (
    <form className="flex max-md:flex-col justify-evenly items-center mt-20" action={formAction}>
      <div className="flex flex-col md:mr-5 w-full">
        <label className="sr-only" htmlFor="settings-email">
          Email
        </label>
        <input
          id="settings-email"
          name="settings-email"
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="mb-15 p-2 disabled:opacity-80 disabled:cursor-not-allowed max-md:text-[15px]"
          disabled={!editingCreds}
        />

        <label className="sr-only" htmlFor="settings-password">
          Password
        </label>
        <input
          id="settings-password"
          name="settings-password"
          type="password"
          placeholder="Change Password"
          className="p-2 disabled:opacity-80 disabled:cursor-not-allowed max-md:text-[15px]"
          disabled={!editingCreds}
        />
      </div>

      {editingCreds ? (
        <div className="flex items-center max-md:mt-10">
          <button className="bg-sky-300 p-5 mr-10" type="button" onClick={() => setEditingCreds(false)}>
            Cancel
          </button>

          <button className="bg-sky-300 p-5" type="submit">
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center max-md:mt-10">
          <button className="bg-sky-300 p-5" type="button" onClick={() => setEditingCreds(true)}>
            Change Credentials
          </button>
        </div>
      )}

      {state.error && <PopupMessage key={state.popupKey} message={state.error} type="error" />}
      {state.message && <PopupMessage key={state.popupKey} message={state.message} type="success" />}
    </form>
  );
}