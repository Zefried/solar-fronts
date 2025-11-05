// DateSelector.jsx
import React, { useState } from 'react';

const DatePicker = ({ onChange }) => {

  const [state, setState] = useState({ date: '', selected: false });

  const handleDateChange = (e) => {
    const updated = { date: e.target.value, selected: true };
    setState(updated);
    onChange?.(updated); // send data back to parent
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="date"
        value={state.date}
        onChange={handleDateChange}
        style={{ padding: '6px', borderRadius: '4px' }}
      />
      {state.selected && <span>Selected: {state.date}</span>}
    </div>
  );
  
};

export default DatePicker;
