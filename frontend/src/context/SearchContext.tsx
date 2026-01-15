import { createContext, useContext, useState, type ReactNode } from 'react';

type SearchContextType = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

const SearchContext = createContext<SearchContextType>({
    searchTerm: '',
    setSearchTerm: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);


