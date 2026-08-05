"use client";

import { changeCredentials } from "@/app/lib/actions";
import { useState } from "react";

export default function CredentialsForm({ email }: { email: string }) {
  const [editingCreds, setEditingCreds] = useState(false);

  return (
    <form className="flex justify-between mt-20" action={changeCredentials}>
      <div className="flex flex-col w-[60%] mr-5">
        <label className="sr-only" htmlFor="settings-email">
          Email
        </label>
        <input
          id="settings-email"
          name="settings-email"
          type="email"
          placeholder="Email"
          defaultValue={email}
          className="mb-15 p-2 disabled:opacity-80 disabled:cursor-not-allowed" disabled={!editingCreds}
        />

        <label className="sr-only" htmlFor="settings-password">
          Password
        </label>
        <input
          id="settings-password"
          name="settings-password"
          type="password"
          placeholder="Change Password"
          className="p-2 disabled:opacity-80 disabled:cursor-not-allowed" disabled={!editingCreds}
        />
      </div>

      {editingCreds ? (
        <div className="flex items-center justify-center mr-20">
          <button className="bg-sky-300 p-5 mr-10" type="button" onClick={() => setEditingCreds(false)}>
            Cancel
          </button>

          <button className="bg-sky-300 p-5" type="submit">
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center mr-20">
          <button className="bg-sky-300 p-10" type="button" onClick={() => setEditingCreds(true)}>
            Change Credentials
          </button>
        </div>
      )}
    </form>
  );
}