import React, { useState } from 'react';

interface AdvancedColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const AdvancedColorPicker: React.FC<AdvancedColorPickerProps> = ({ color, onChange }) => {
  const [pickerColor, setPickerColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);  // Add this state

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setPickerColor(newColor);
    onChange(newColor);
  };

  const handleRGBChange = (type: 'r' | 'g' | 'b', value: number) => {
    const rgb = hexToRgb(pickerColor);
    if (rgb) {
      const newColor = {
        ...rgb,
        [type]: value,
      };
      const hex = rgbToHex(newColor.r, newColor.g, newColor.b);
      setPickerColor(hex);
      onChange(hex);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{ backgroundColor: pickerColor, width: '36px', height: '36px', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}  // Toggle isOpen state
      ></div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: '#646767',
          border: '1px solid #ccc',
          padding: '10px',
          fontFamily: 'Arial, sans-serif', // Change font family here
          color: '#000', // Change font color here
        }}>
          <div>
            <label>Hex: </label>
            <input
              type="text"
              value={pickerColor}
              onChange={handleHexChange}
              maxLength={7}
              style={{ width: '80px', color: '#000' }} // Change text color inside the input
            />
          </div>
          <div>
            <label>R: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={hexToRgb(pickerColor)?.r || 0}
              onChange={(e) => handleRGBChange('r', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>G: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={hexToRgb(pickerColor)?.g || 0}
              onChange={(e) => handleRGBChange('g', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>B: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={hexToRgb(pickerColor)?.b || 0}
              onChange={(e) => handleRGBChange('b', parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const hexToRgb = (hex: string) => {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export default AdvancedColorPicker;
