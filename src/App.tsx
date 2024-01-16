import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './App.css';

interface Chip {
  id: number;
  label: string;
  profilePicture: string;
}

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // Update the type to match your items
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);

  const items = [
    { name: 'Terry Doe', email: 'terry@abc.com', profilePicture: 'https://robohash.org/Terry.png?set=set4' },
    { name: 'Sheldon Smith', email: 'sldn@abc.com', profilePicture: 'https://robohash.org/Sheldon.png?set=set4' },
    { name: 'Terrill', email: 'terrill@abc.com', profilePicture: 'https://robohash.org/Terrill.png?set=set4' },
    { name: 'Miles', email: 'miles@gmail.com', profilePicture: 'https://robohash.org/Miles.png?set=set4' },
    { name: 'Maven', email: 'maven@abc.com', profilePicture: 'https://robohash.org/Mavis.png?set=set4' },
    { name: 'Alison', email: 'alison@abc.com', profilePicture: 'https://robohash.org/Alison.png?set=set4' },
    { name: 'Oleta', email: 'oleta@abc.com', profilePicture: 'https://robohash.org/Oleta.png?set=set4' },
    { name: 'Ewell', email: 'jane@abc.com', profilePicture: 'https://robohash.org/Ewell.png?set=set4' },
    { name: 'Marcel Wane', email: 'marcel@abc.com', profilePicture: 'https://robohash.org/Marcel.png?set=set4' },
    { name: 'Enoch', email: 'enc@abc.com', profilePicture: 'https://robohash.org/Enoch.png?set=set4' },
    { name: 'Arely Sim', email: 'arely@abc.com', profilePicture: 'https://robohash.org/Arely.png?set=set4' },
    { name: 'Gust Josh', email: 'gus@abc.com', profilePicture: 'https://robohash.org/Gust.png?set=set4' },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    filterItems(text);
  };

  const filterItems = (text: string) => {
    const filtered = items.filter(
      item =>
        !chips.some(chip => chip.label === item.name) &&
        item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (item: any) => {
    const newChips = [...chips, { id: chips.length + 1, label: item.name, profilePicture: item.profilePicture }];
    setChips(newChips);
    setSearchText('');
    inputRef.current?.focus();
  };

  const handleChipRemove = (id: number, label: string) => {
    const newChips = chips.filter(chip => chip.id !== id);
    setChips(newChips);
    setFilteredItems([...filteredItems, { name: label }]);
  };

  //function to handle feature that highlights and removes last chip on backspace
  const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && searchText === '' && chips.length > 0) {
      event.preventDefault(); 
  
      // setting the focus on input if there are no highlighted chips
      if (!highlightedChip) {
        setHighlightedChip(chips[chips.length - 1].id);
        return;
      }
  
      // removing highlighted chip
      const newChips = chips.filter(chip => chip.id !== highlightedChip);
      setChips(newChips);
      setHighlightedChip(null);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (inputRef.current && !inputRef.current.contains(target)) {
        setSearchText('');
        setFilteredItems([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="App">
      <h1 className='user-heading'>User List</h1>
      <div className="chip-container">
        <div className='cont'>
        <div className="chips-wrapper">
          {chips.map(chip => (
            <div key={chip.id} className={`chip ${highlightedChip === chip.id ? 'chip-highlighted' : ''}`}>
              <img src={chip.profilePicture} alt={chip.label} className="chip-profile-pic" />
              <span>{chip.label}</span>
              <span className="chip-remove" onClick={() => handleChipRemove(chip.id, chip.label)}>
                X
              </span>
            </div>
          ))}
          <div className="search-bar">
          <input
            type="text"
            onClick={() => filterItems(searchText)}
            ref={inputRef}
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
            placeholder="Type to search..."
          />
          {filteredItems.length > 0 && (
            <ul className="search-list">
              {filteredItems.map(item => (
                <li key={item.name} onClick={() => handleItemClick(item)} className="search-list-item">
                <img src={item.profilePicture} alt={item.name} className="search-list-profile-pic" />
                <div className="search-list-text">
                  <span className="search-list-name">{item.name}</span>
                  <span className="search-list-email">{item.email}</span>
                </div>
              </li>
              ))}
            </ul>
          )}
        </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;
