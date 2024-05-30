import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Assets
import Logo from "../../assets/logo-itviec.webp";

import { useAuth0 } from "@auth0/auth0-react";

// Components
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import {
    Menubar,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSeparator,
  MenubarSubContent,
} from "../ui/menubar";

// Icons
import {
  ChevronDown,
  ChevronRight,
    User,
    Briefcase,
    Inbox,
    Mail,
    Settings,
    LogOut,
} from "lucide-react";

const menuContent = [{
  title: "All Jobs",
  items: [
    {
      title: "Jobs by Skill",
      href: "/test",
      items: [
        {
          title: "Email link",
          href: "/test1",
        },
        {
          title: "Messages",
          href: "test2",
        },
        {
          title: "Notes",
          href: "test3",
        },
        {
          title: "Email link",
          href: "/test1",
        },
        {
          title: "Messages",
          href: "test2",
        },
        {
          title: "Notes",
          href: "test3",
        },
        {
          title: "Email link",
          href: "/test1",
        },
        {
          title: "Messages",
          href: "test2",
        },
        {
          title: "Notes",
          href: "test3",
        },
      ],
    },
  ],
}]

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
        useAuth0();

    // Change header style on scroll
    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
        });
    });

    return (
        <header
            className={`fixed z-10 flex w-full items-center justify-between border-b-2 border-muted-foreground bg-linear-gradient px-8 2xl:px-40 ${isActive ? "h-[60px]" : "h-[88px]"}`}
        >
            <div className="flex space-x-6">
                <a href="/">
                    <img src={Logo} alt="Logo" className="w-[108px]" />
                </a>

          <div className="flex items-center text-lg"> 
          <Menubar>
            {menuContent && menuContent.map((menu) => { 
              return (
                  <MenubarMenu key={menu.title}>
                  <MenubarTrigger>
                      <span className="text-base text-gray-300">{menu.title}</span>
                      <ChevronDown className="mr-1 h-5 w-5 text-muted-foreground" />
                    </MenubarTrigger>
                    <MenubarContent className="rounded-none border-none bg-[#121212] text-[#a6a6a6] p-0">
                      {menu.items.map((item) => {
                        return (
                          <MenubarSub key={item.title} className="relative">
                            <MenubarSubTrigger className="rounded-none p-3 focus:bg-[#414042] data-[state=open]:bg-[#414042] data-[state=open]:text-white focus:text-white">
                              <Link to={item.href}>
                                {item.title}
                              </Link>
                            </MenubarSubTrigger>
                            <MenubarSubContent className="absolute rounded-none border-none bg-[#121212] text-muted-foreground p-0">
                              <ul className="grid w-[400px] md:w-[500px] md:grid-cols-4 lg:w-[600px] ">
                                {item.items.map((subItem) => {
                                  return (
                                    <MenubarItem key={subItem.title} className="rounded-none focus:bg-[#414042] data-[state=open]:bg-[#414042] data-[state=open]:text-white focus:text-white">
                                      <Link to={subItem.href}>
                                        {subItem.title}
                                      </Link>
                                    </MenubarItem>
                                  );
                                })}
                              </ul>
                              <MenubarSeparator className="m-0" />
                              <MenubarItem className="rounded-none focus:bg-[#414042] data-[state=open]:bg-[#414042] data-[state=open]:text-white focus:text-white flex justify-center">
                                <Link to={item.href}>View all { item.title }</Link>
                                <ChevronRight className="mr-1 h-5 w-5 text-muted-foreground" />
                              </MenubarItem>
                            </MenubarSubContent>
                          </MenubarSub>
                        );
                      })}
                    </MenubarContent>
                  </MenubarMenu>
              );
            }) }
            </Menubar>
                  </div>
            </div>
            <ul className="flex items-center space-x-6">
                <li>
                    <Button
                        variant="link"
                        className="h-min p-0 text-white hover:no-underline"
                    >
                        For Employers
                    </Button>
                </li>
                {/* Login/Logout  */}
                {isLoading ? (
                    <></>
                ) : isAuthenticated ? (
                    <Menubar className="border-none bg-inherit">
                        <MenubarMenu>
                            <MenubarTrigger>
                                <li>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <div className="overflow-hidden rounded-full border-2 border-white">
                                            <img
                                                src={user.picture}
                                                alt="Avatar"
                                                className="h-8 w-8"
                                            />
                                        </div>
                                        <div className="text-white">
                                            {user.nickname}
                                        </div>
                                        <ChevronDown className="mr-1 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </li>
                            </MenubarTrigger>
                            <MenubarContent
                                align="end"
                                sideOffset={8}
                                className="w-56"
                            >
                                <MenubarItem className="border-b-2 border-gray-300">
                                    {" "}
                                    <User className="mr-2 h-5 w-5 text-muted-foreground" />
                                    Profile & CVs
                                </MenubarItem>
                                <MenubarItem className="border-b-2 border-gray-300">
                                    <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
                                    My Jobs
                                </MenubarItem>
                                <MenubarItem className="border-b-2 border-gray-300">
                                    <Inbox className="mr-2 h-5 w-5 text-muted-foreground" />
                                    AI Match Invitation
                                </MenubarItem>
                                <MenubarItem className="border-b-2 border-gray-300">
                                    <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                                    Email Subscriptions
                                </MenubarItem>
                                <MenubarItem className="border-b-2 border-gray-300">
                                    <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
                                    Settings
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() =>
                                        logout({
                                            logoutParams: {
                                                returnTo:
                                                    window.location.origin,
                                            },
                                        })
                                    }
                                >
                                    <LogOut className="mr-2 h-5 w-5 text-muted-foreground" />
                                    Sign Out
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                ) : (
                    <li>
                        <Button
                            variant="link"
                            className="h-min p-0 text-white hover:no-underline"
                            onClick={() => loginWithRedirect()}
                        >
                            Sign in/Sign up
                        </Button>
                    </li>
                )}
                <li className="flex space-x-3 p-0">
                    <Button
                        variant="link"
                        className="h-min p-0 text-white hover:no-underline"
                    >
                        EN
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                        variant="link"
                        className="h-min p-0 text-muted-foreground hover:no-underline"
                    >
                        VI
                    </Button>
                </li>
            </ul>
        </header>
    );
};

export default Header;
