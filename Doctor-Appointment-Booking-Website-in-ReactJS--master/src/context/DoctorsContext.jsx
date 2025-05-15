import { createContext, useState } from 'react';

export const DoctorsContext = createContext({
  doctors: [],
  setDoctors: () => {}
});

export const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  return (
    <DoctorsContext.Provider value={{ doctors, setDoctors }}>
      {children}
    </DoctorsContext.Provider>
  );
};
