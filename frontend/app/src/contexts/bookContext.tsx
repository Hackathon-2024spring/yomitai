import React, { createContext, useState, ReactNode, useContext } from "react";

interface BookInfo {
  title: string;
  authors: string;
  publisher: string;
  pages: number;
}

interface BookContextProps {
  bookInfo: BookInfo;
  setBookInfo: (info: BookInfo) => void;
}

const defaultBookInfo = {
  title: "",
  authors: "",
  publisher: "",
  pages: 0
};

const BookContext = createContext<BookContextProps>({
  bookInfo: defaultBookInfo,
  setBookInfo: () => { }
});

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [bookInfo, setBookInfo] = useState<BookInfo>(defaultBookInfo);

  return (
    <BookContext.Provider value={{ bookInfo, setBookInfo }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
