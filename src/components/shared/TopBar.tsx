import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/querriesAndMutation";
import { useUserContext } from "@/contexts/AuthContext";

export const TopBar = () => {
  const navigate = useNavigate();
  const { mutateAsync: onSignOut, isSuccess: signedOut } = useSignOutAccount();
  const {user} = useUserContext()

  useEffect(() => {
    if (signedOut) {
      navigate(0);
    }
  }, [signedOut]);

  return (
    <>
      <section className="topbar">
        <div className="flex-between py-4 px-5">
          <Link to="/" className="flex gap-3 item-center">
            <img
              src="/assets/images/code_curse_logo.png"
              alt="logo"
              width={130}
              height={325}
            />
          </Link>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={() => {
                onSignOut();
              }}
            >
              <img src="/assets/icons/logout.svg" alt="logout" />
            </Button>
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img src={user.imageUrl || '/assets/images/profile-placeholder.svg'} alt="userLogo" className="h-8 w-8 rounded-full" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
 