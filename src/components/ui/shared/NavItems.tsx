"use client";
import React from "react";
import { headerLinks } from "../../../../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();
  return (
    <ul className="md:flex-between flex  w-full  flex-col items-start md:flex-row gap-5 ">
      {headerLinks?.map((link, i) => {
        const isActive = pathName === link.route;
        return (
          <li className={`${isActive && "text-primary-500"} flex-center p-medium-16 whitespace-nowrap`} key={i}>
            <Link href={link.route}>{link.label}</Link> 
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
