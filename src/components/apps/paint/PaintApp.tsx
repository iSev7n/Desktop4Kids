// PaintApp.tsx
import React, { useState, useRef } from 'react';
import './PaintApp.css';
import DrawingCanvas from './DrawingCanvas';
import AdvancedColorPicker from './AdvancedColorPicker'; // Import AdvancedColorPicker

interface PaintAppProps {
  saveFile: (fileName: string, data: string) => void;
  loadFile: (fileName: string) => Promise<string>;
}

const PaintApp: React.FC<PaintAppProps> = ({ saveFile, loadFile }) => {
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const [zoomLevel, setZoomLevel] = useState(0.6); // Initial zoom level
  const [backgroundColor, setBackgroundColor] = useState('#FF00'); // Set your default color code
  const [isEraser, setIsEraser] = useState(false); // Add state for eraser
  const drawingCanvasRef = useRef<{ clearCanvas: () => void, saveDrawing: () => void, loadDrawing: () => void, fillCanvas: () => void }>(null);

  const handleZoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 5));
  const handleZoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));

  const handleClearCanvas = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.clearCanvas();
    }
  };

  const handleSaveDrawing = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.saveDrawing();
    }
  };

  const handleLoadDrawing = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.loadDrawing();
    }
  };

  const handleFillCanvas = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.fillCanvas();
    }
  };

  const toggleEraser = () => setIsEraser(!isEraser); // Add toggle function

  return (
    <div className="paint-app">
      <DrawingCanvas
        ref={drawingCanvasRef}
        color={color}
        lineWidth={lineWidth}
        zoomLevel={zoomLevel}
        backgroundColor={backgroundColor}
        onSave={saveFile}
        onLoad={loadFile}
        isEraser={isEraser} // Pass eraser state to DrawingCanvas
      />
      <div className="controls">
        <label>
          Brush Color:
          <AdvancedColorPicker
            color={color}
            onChange={(newColor) => setColor(newColor)}
          />
        </label>
        <label>
          Brush Size:
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value, 10))}
          />
        </label>
        <button onClick={toggleEraser}>{isEraser ? 'Switch to Brush' : 'Switch to Eraser'}</button>
        <button onClick={handleFillCanvas}>Fill</button>
        <button onClick={handleClearCanvas}>Clear</button>
        <button onClick={handleSaveDrawing}>Save</button>
        <button onClick={handleLoadDrawing}>Load</button>
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>
    </div>
  );
};

export default PaintApp;
