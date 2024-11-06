import { createContext, useContext, useState, ReactNode } from 'react';

interface AttendanceContextType {
  showModal: boolean;
  toggleModal: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <AttendanceContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendanceContext = () => {
  const context = useContext(AttendanceContext);
  if (!context) throw new Error("useAttendanceContext must be used within AttendanceProvider");
  return context;
};
