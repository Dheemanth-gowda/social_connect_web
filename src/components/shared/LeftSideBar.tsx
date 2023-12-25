import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/querriesAndMutation";
import { useUserContext } from "@/contexts/AuthContext";
import { sidebarLinks } from "@/constant";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

export const LeftSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: onSignOut, isSuccess: signedOut } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (signedOut) {
      navigate(0);
    }
  }, [signedOut]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/code_curse_logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile pic"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-3"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <Button
        className="flex flex-start flex-row gap-2 p-4"
        onClick={() => onSignOut()}
      >
        <img
          src="/assets/icons/logout.svg"
          alt="logout"
          className="hover:invert-white"
        />
        <p className="text-white">Logout</p>
      </Button> */}
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => {
          onSignOut();
        }}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
