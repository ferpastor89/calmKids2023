import { useState } from 'react';
import './config.css';

function Config({ onConfigChange }) {
  const [config, setConfig] = useState('en casa');

  const handleConfigChange = (event) => {
    const newConfig = event.target.value;
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className='seteoLugar'>
      <select value={config} onChange={handleConfigChange}>
        <option value="en casa" className="option-text">casa</option>
        <option value="en transporte" className="option-text">transporte/calle</option>
      </select>
    </div>
  );
}

export default Config;
