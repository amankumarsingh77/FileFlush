'use client'
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  createContext, useContext, useEffect, useMemo, useState } from "react";
import { navitems } from "../helpers/navitem";



const SidebarContext = createContext<any>(null);

export default function SideBar() {
    const { isSignedIn, user } = useUser();
    const [emailAddress, setEmailAddress]= useState<string>("");
    const [fullname, setFullname] = useState("");
    const pathname = usePathname();
    
    
    useEffect(() => { 
        if (isSignedIn && user) {
            setEmailAddress(user.emailAddresses[0]?.emailAddress ?? '');
            setFullname(user.fullName ?? '');
        }
    }, [isSignedIn, user]);
    
    
    const [expanded, setExpanded] = useState(false);
    if(pathname != "/"){
    return (
        <aside className="h-screen">
            <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                            }`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        {navitems.map((item)=>{
                            return (
                                <SideBarItems key={item.route} item={item}/>
                            )
                        })}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    
                    <UserButton />
                    <div
                        className={`
                  flex justify-between items-center
                  overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{fullname}</h4>
                            <span className="text-xs text-gray-600">{emailAddress}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

    
}
export function SideBarItems({item}:any) {
    const { expanded } = useContext(SidebarContext);
    const pathname = usePathname();
    
    
    const isActive = useMemo(() => {
       
        
          if (item.route === pathname) {
            return true;
          }
        return item.route === pathname;
      }, [item, item.route, pathname]);
    return (
        <Link href={item.route}
            className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${isActive
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
        `}
        >
            <item.icon/>
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {item.text}
            </span>
            {item.alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
                >
                    {item.text}
                </div>
            )}
        </Link>
    )
    
}
