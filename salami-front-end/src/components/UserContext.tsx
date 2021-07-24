import { useState, createContext, ReactNode } from "react";

// interface
interface ISampleUsers {
  id: number;
  name: string;
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

const sampleData: ISampleUsers[] = [
  { id: 1, name: "বড় মামা", amount: 100, status: "earn" },
  { id: 2, name: "চাচা", amount: 200, status: "earn" },
  { id: 3, name: "খালা মানি", amount: 300, status: "earn" },
];

export const userContext = createContext<ISampleUsers[]>(sampleData);
export const salamiAddModalContext = createContext(addSalamiContext);
export const salamiRemoveModalContext = createContext(removeSalamiContext);

export function UserProvider({ children }: ReactNodeType) {
  const [sampleUsers, setSampleUsers] = useState<ISampleUsers[]>(sampleData);
  const [addOpen, setAddOpen] = useState(addSalamiContext.addOpen);
  const [removeOpen, setRemoveOpen] = useState(removeSalamiContext.removeOpen);

  return (
    <userContext.Provider value={sampleUsers}>
      <salamiAddModalContext.Provider value={{ addOpen, setAddOpen }}>
        <salamiRemoveModalContext.Provider
          value={{ removeOpen, setRemoveOpen }}
        >
          {children}
        </salamiRemoveModalContext.Provider>
      </salamiAddModalContext.Provider>
    </userContext.Provider>
  );
}
