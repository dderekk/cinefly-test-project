import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { Services } from "./services";

const DIContext = createContext<Services | undefined>(undefined);

export const DIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const axiosClient = axios;
  const services = new Services(axiosClient);

  return <DIContext.Provider value={services}>{children}</DIContext.Provider>;
};

export const useServices = (): Services => {
  const context = useContext(DIContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a DIProvider");
  }
  return context;
};
