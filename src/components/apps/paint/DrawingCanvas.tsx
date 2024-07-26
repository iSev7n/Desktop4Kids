// DrawingCanvas.tsx
import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface DrawingCanvasProps {
  color: string;
  lineWidth: number;
  zoomLevel: number;
  backgroundColor: string;
  onSave: (fileName: string, data: string) => void;
  onLoad: (fileName: string) => Promise<string>;
  isEraser: boolean;
}

const DrawingCanvas = forwardRef((props: DrawingCanvasProps, ref) => {
  const { color, lineWidth, zoomLevel, backgroundColor, onSave, onLoad, isEraser } = props;
  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const baseContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const displayContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useImperativeHandle(ref, () => ({
    clearCanvas,
    saveDrawing,
    loadDrawing,
    fillCanvas,
  }));

  useEffect(() => {
    const baseCanvas = baseCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (baseCanvas && displayCanvas) {
      baseCanvas.width = window.innerWidth * 2;
      baseCanvas.height = window.innerHeight * 2;
      baseCanvas.style.width = `${window.innerWidth}px`;
      baseCanvas.style.height = `${window.innerHeight}px`;

      displayCanvas.width = window.innerWidth;
      displayCanvas.height = window.innerHeight;

      const baseContext = baseCanvas.getContext('2d');
      const displayContext = displayCanvas.getContext('2d');

      if (baseContext && displayContext) {
        baseContext.fillStyle = 'white'; // Set drawing canvas to white
        baseContext.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
        baseContext.lineCap = 'round';
        baseContext.strokeStyle = color;
        baseContext.lineWidth = lineWidth;
        baseContextRef.current = baseContext;

        displayContextRef.current = displayContext;

        // Initial render
        renderToDisplayCanvas();
      }
    }
  }, []);

  useEffect(() => {
    if (baseContextRef.current) {
      baseContextRef.current.strokeStyle = isEraser ? 'white' : color; // Change color to white if eraser is selected
    }
  }, [color, isEraser]);

  useEffect(() => {
    if (baseContextRef.current) {
      baseContextRef.current.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  useEffect(() => {
    renderToDisplayCanvas();
  }, [zoomLevel, backgroundColor]);

  const getTransformedCoords = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const displayCanvas = displayCanvasRef.current;
    const baseCanvas = baseCanvasRef.current;

    if (displayCanvas && baseCanvas) {
      const centerX = (displayCanvas.width - baseCanvas.width / 2 * zoomLevel) / 2;
      const centerY = (displayCanvas.height - baseCanvas.height / 2 * zoomLevel) / 2;

      const x = (offsetX - centerX) / zoomLevel;
      const y = (offsetY - centerY) / zoomLevel;

      return { x: x * 2, y: y * 2 };
    }
    return { x: offsetX, y: offsetY };
  };

  const startDrawing = (event: React.MouseEvent) => {
    const { x, y } = getTransformedCoords(event);
    if (baseContextRef.current) {
      baseContextRef.current.beginPath();
      baseContextRef.current.moveTo(x, y);
    }
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (baseContextRef.current) {
      baseContextRef.current.closePath();
    }
    setIsDrawing(false);
    renderToDisplayCanvas();
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing || !baseContextRef.current) {
      return;
    }
    const { x, y } = getTransformedCoords(event);
    baseContextRef.current.lineTo(x, y);
    baseContextRef.current.stroke();
    renderToDisplayCanvas();
  };

  const clearCanvas = () => {
    const baseCanvas = baseCanvasRef.current;
    if (baseCanvas && baseContextRef.current) {
      baseContextRef.current.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
      baseContextRef.current.fillStyle = 'white'; // Ensure drawing canvas is white after clearing
      baseContextRef.current.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
    }
    renderToDisplayCanvas();
  };

  const saveDrawing = () => {
    const baseCanvas = baseCanvasRef.current;
    if (baseCanvas) {
      const dataUrl = baseCanvas.toDataURL('image/png');
      const fileName = prompt("Enter file name to save:", "drawing.png");
      if (fileName) {
        onSave(fileName, dataUrl);
      }
    }
  };

  const loadDrawing = async () => {
    const fileName = prompt("Enter file name to load:");
    if (fileName) {
      const dataUrl = await onLoad(fileName);
      const baseCanvas = baseCanvasRef.current;
      const baseContext = baseContextRef.current;
      if (baseCanvas && baseContext && dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          baseContext.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
          baseContext.fillStyle = 'white'; // Ensure drawing canvas is white
          baseContext.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
          baseContext.drawImage(img, 0, 0, baseCanvas.width, baseCanvas.height);
          renderToDisplayCanvas();
        };
      }
    }
  };

  const fillCanvas = () => {
    const baseCanvas = baseCanvasRef.current;
    if (baseCanvas && baseContextRef.current) {
      baseContextRef.current.fillStyle = color;
      baseContextRef.current.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
    }
    renderToDisplayCanvas();
  };

  const renderToDisplayCanvas = () => {
    const baseCanvas = baseCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    const displayContext = displayContextRef.current;
    if (baseCanvas && displayCanvas && displayContext) {
      displayContext.setTransform(1, 0, 0, 1, 0, 0);
      displayContext.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayContext.fillStyle = backgroundColor; // Set background color for display canvas
      displayContext.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
      
      const centerX = (displayCanvas.width - baseCanvas.width / 2 * zoomLevel) / 2;
      const centerY = (displayCanvas.height - baseCanvas.height / 2 * zoomLevel) / 2;
      
      displayContext.translate(centerX, centerY);
      displayContext.scale(zoomLevel, zoomLevel);
      displayContext.drawImage(baseCanvas, 0, 0, baseCanvas.width, baseCanvas.height, 0, 0, baseCanvas.width / 2, baseCanvas.height / 2);
    }
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={displayCanvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
      />
      <canvas ref={baseCanvasRef} style={{ display: 'none' }} />
    </div>
  );
});

export default DrawingCanvas;
