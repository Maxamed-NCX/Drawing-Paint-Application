// components/DrawingCanvas.tsx
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

interface Point {
  x: number;
  y: number;
}

interface LineData {
  points: number[];
}

const DrawingCanvas: React.FC = () => {
  const stageRef = useRef<any>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [lines, setLines] = useState<LineData[]>([]);
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = stage.findOne('Layer');

    if (drawing) {
      layer.draw();
    }
  }, [drawing, lines]);

  const handleMouseDown = (e: any) => {
    setDrawing(true);
    setLines([...lines, { points: [e.target.x(), e.target.y()] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!drawing) return;

    const stage = stageRef.current;
    const point: Point = {
      x: e.target.x(),
      y: e.target.y(),
    };

    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines([...lines.slice(0, lines.length - 1), lastLine]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div className="p-4">
      <label className="block mb-2">
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="ml-2"
        />
      </label>
      <label className="block mb-2">
        Brush Size:
        <input
          type="number"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="ml-2"
        />
      </label>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        className="border border-gray-300"
      >
        <Layer>
          <Rect width={window.innerWidth} height={window.innerHeight} fill="white" />
        </Layer>
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={color}
              strokeWidth={brushSize}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
      <button
        onClick={() => {
          const dataURL = stageRef.current.toDataURL();
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'drawing.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Drawing
      </button>
    </div>
  );
};

export default DrawingCanvas;
