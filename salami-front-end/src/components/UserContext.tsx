import { useState, createContext, ReactNode } from "react";
import { sampleEarnData } from "./SampleData/SampleData";
import { sampleSpendData } from "./SampleData/SampleData";

// interface
interface ISampleUsers {
  id: number;
  name: string;
  amount: number;
  status: string;
}

interface ISpendContext {
  id: number;
  purpose: string;
  amount: number;
  status: string;
}

type ReactNodeType = {
  children: ReactNode;
};

const addSalamiContext = {
  addOpen: false,
  setAddOpen: (addOpen: boolean) => {},
};

const removeSalamiContext = {
  removeOpen: { status: false },
  setRemoveOpen: (removeOpen: { status: boolean; id?: number }) => {},
};

export const userContext = createContext<ISampleUsers[]>(sampleEarnData);
export const salamiAddModalContext = createContext(addSalamiContext);
export const salamiRemoveModalContext = createContext(removeSalamiContext);

export const salamiSpendContext =
  createContext<ISpendContext[]>(sampleSpendData);

export function UserProvider({ children }: ReactNodeType) {
  const [sampleUsers, setSampleUsers] =
    useState<ISampleUsers[]>(sampleEarnData);

  const [salamiSpendSampleData, SetSalamiSpendSampleData] =
    useState<ISpendContext[]>(sampleSpendData);

  const [addOpen, setAddOpen] = useState(addSalamiContext.addOpen);
  const [removeOpen, setRemoveOpen] = useState(removeSalamiContext.removeOpen);

  return (
    <userContext.Provider value={sampleUsers}>
      <salamiSpendContext.Provider value={salamiSpendSampleData}>
        <salamiAddModalContext.Provider value={{ addOpen, setAddOpen }}>
          <salamiRemoveModalContext.Provider
            value={{ removeOpen, setRemoveOpen }}
          >
            {children}
          </salamiRemoveModalContext.Provider>
        </salamiAddModalContext.Provider>
      </salamiSpendContext.Provider>
    </userContext.Provider>
  );
}
