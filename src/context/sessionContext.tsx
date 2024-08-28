"use client";

import { User } from "@/models/User";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as UserApi from "@/network/flights/user";

interface SessionContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

// Create the context with a default value of undefined
const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionContextProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = async () => {
    const data = await UserApi.getUser();
    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    getUser();

    // Define the function that handles tab/window focus
    const handleFocus = () => {
      getUser();
    };

    // Add event listeners for focus and visibilitychange
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use the context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
