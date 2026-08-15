"use client";

import { useActionState } from "react";
import PopupMessage from "../message/popupMessage";
import { PopupMessageState, User } from "@/app/lib/data";
import { editUser } from "@/app/lib/actions";

export default function EditUserForm({ user }: { user?: User }) {
  const editUserWithId = editUser.bind(null, user?.userid || "");
  const [state, formAction] = useActionState(editUserWithId, {} as PopupMessageState);


  if (!user) return <h1>User not found!</h1>;

  return (
    <form className="flex flex-col items-center mt-20" action={formAction}>
      <div className="flex flex-col md:mr-5 w-full">
        <label className="sr-only" htmlFor="edit-user-email">
          Email
        </label>
        <input
          id="edit-user-email"
          name="edit-user-email"
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          className="mb-15 p-2 max-md:text-[15px]"
        />

        <label className="sr-only" htmlFor="edit-user-password">
          Password
        </label>
        <input
          id="edit-user-password"
          name="edit-user-password"
          type="password"
          placeholder="Change Password"
          className="p-2 max-md:text-[15px]"
        />

        <div className="flex mt-20">
          <label className="text-4xl" htmlFor="edit-ban-status">
            Ban:
          </label>
          <input
            id="edit-ban-status"
            name="edit-ban-status"
            type="checkbox"
            defaultChecked={user.isBanned}
            className="w-30"
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full mt-10 mr-1">
        <button className="bg-sky-300 p-5" type="submit">
          Save
        </button>
      </div>

      {state.error && <PopupMessage key={state.popupKey} message={state.error} type="error" />}
      {state.message && <PopupMessage key={state.popupKey} message={state.message} type="success" />}
    </form>
  );
}