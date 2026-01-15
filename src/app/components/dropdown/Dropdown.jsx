import React, { useState } from 'react';
import './dropdown.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';

const Dropdown = ({value,onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
 const { isDayMode } = useTheme();

  const options = ['Newest', 'Oldest'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option)
  };

  return (
    <div className="custom-dropdown border border-slate-50 dark:border-slate-800">
      <div className="selected" onClick={toggleDropdown}>
        {selected}
        <span className="arrow">{isOpen ? <ChevronUp />: <ChevronDown/>}</span>
      </div>
      {isOpen && (
        <ul className={`dropdown-menu ${isDayMode ? 'bg-slate-50' : 'bg-slate-800'}`}>
          {options.map((opt) => (
            <li
              key={opt}
              className={opt === selected ? 'active' : ''}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;