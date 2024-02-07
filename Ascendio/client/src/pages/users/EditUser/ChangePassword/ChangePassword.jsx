import React, { useState } from "react";
import { VeryFyPassword } from "./VerifyPassword/VeryFyPassword";
import { NewPassword } from "./NewPassword/NewPassword";

export const ChangePassword = ({ user, setUser, setShowChangePassword }) => {
  const [showVerifyPassword, setShowVerifyPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      {showVerifyPassword && (
        <VeryFyPassword
          setShowNewPassword={setShowNewPassword}
          setShowVerifyPassword={setShowVerifyPassword}
          setShowChangePassword={setShowChangePassword}
        />
      )}
      {showNewPassword && (
        <NewPassword
          setShowChangePassword={setShowChangePassword}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
};
