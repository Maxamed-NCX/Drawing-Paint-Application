// pages/index.tsx
import DrawingCanvas from '../components/DrawingCanvas';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Canvas Drawing App</h1>
      <DrawingCanvas />
    </div>
  );
};

export default Home;
