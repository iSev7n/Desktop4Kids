import React, { useRef, useState, useEffect } from 'react';
import './PaintApp.css';

interface PaintAppProps {
  saveFile: (fileName: string, data: string) => void;
  loadFile: (fileName: string) => Promise<string>;
}

const PaintApp: React.FC<PaintAppProps> = ({ saveFile, loadFile }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(5);
  const [zoomLevel, setZoomLevel] = useState(0.6); // Initial zoom level

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.scale(zoomLevel, zoomLevel); // Apply initial zoom level
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        contextRef.current = context;
      }
    }
  }, [zoomLevel]); // Initialize with the initial zoom level

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const startDrawing = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX / zoomLevel, offsetY / zoomLevel);
    }
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX / zoomLevel, offsetY / zoomLevel);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.setTransform(1, 0, 0, 1, 0, 0);
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      contextRef.current.scale(2, 2);
      contextRef.current.scale(zoomLevel, zoomLevel);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const fileName = prompt("Enter file name to save:", "drawing.png");
      if (fileName) {
        saveFile(fileName, dataUrl);
      }
    }
  };

  const loadDrawing = async () => {
    const fileName = prompt("Enter file name to load:");
    if (fileName) {
      const dataUrl = await loadFile(fileName);
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (canvas && context && dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.scale(2, 2);
          context.scale(zoomLevel, zoomLevel);
          context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
        };
      }
    }
  };

  const handleZoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 5));
  const handleZoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));

  return (
    <div className="paint-app">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
        />
      </div>
      <div className="controls">
        <label>
          Brush Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
        <button onClick={clearCanvas}>Clear Canvas</button>
        <button onClick={saveDrawing}>Save Drawing</button>
        <button onClick={loadDrawing}>Load Drawing</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

export default PaintApp;
