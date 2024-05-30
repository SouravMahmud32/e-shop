"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className=" relative z-30">
        <div
          onClick={toggleOpen}
          className=" p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        >
          <Avatar></Avatar>
          <AiFillCaretDown></AiFillCaretDown>
        </div>
        {isOpen && (
          <div className=" absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 flex flex-col text-sm cursor-pointer">
            <div>
              <Link href="/oders">
                <MenuItem onclick={toggleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onclick={toggleOpen}>Admin Dashboard</MenuItem>
              </Link>
              <MenuItem
                onclick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                Logout
              </MenuItem>
            </div>
            <div>
              <Link href="/login">
                <MenuItem onclick={toggleOpen}>Login</MenuItem>
              </Link>
              <Link href="/register">
                <MenuItem onclick={toggleOpen}>Register</MenuItem>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen}></BackDrop> : null}
    </>
  );
};

export default UserMenu;
