import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Weight,
  ArrowUpDown,
  LineChart,
} from "lucide-react";
import {
  LineChart as ReChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PhysicsLab = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mass, setMass] = useState(1);
  const [springConstant, setSpringConstant] = useState(10);
  const [displacement, setDisplacement] = useState(0);
  const [time, setTime] = useState(0);
  const [period, setPeriod] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState(true);

  const navigate = useNavigate(); // Initialize the navigation hook

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastTimeRef = useRef(0);

  const restLength = 150;
  const maxStretch = 100;

  const calculateSpringPosition = (t) => {
    const angularFrequency = Math.sqrt(springConstant / mass);
    const amplitude = maxStretch;
    return amplitude * Math.cos(angularFrequency * t);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const topY = 50;

    const drawSpring = (stretch) => {
      const segments = 20;
      const segmentHeight = (restLength + stretch) / segments;
      const amplitude = 20;

      ctx.beginPath();
      ctx.moveTo(centerX, topY);

      for (let i = 0; i <= segments; i++) {
        const y = topY + i * segmentHeight;
        const x = centerX + amplitude * Math.sin((i / segments) * Math.PI * 10);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#4B5563";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawWeight = (y) => {
      const weightSize = 30 + mass * 5;

      const gradient = ctx.createRadialGradient(
        centerX,
        y,
        0,
        centerX,
        y,
        weightSize
      );
      gradient.addColorStop(0, "#3B82F6");
      gradient.addColorStop(1, "#1D4ED8");

      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      ctx.beginPath();
      ctx.arc(centerX, y, weightSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      const shineGradient = ctx.createLinearGradient(
        centerX - weightSize,
        y - weightSize,
        centerX + weightSize,
        y + weightSize
      );
      shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      shineGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");

      ctx.beginPath();
      ctx.arc(centerX, y, weightSize, 0, Math.PI * 2);
      ctx.fillStyle = shineGradient;
      ctx.fill();

      ctx.shadowColor = "transparent";
    };

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentDisplacement = calculateSpringPosition(elapsed);
      setDisplacement(currentDisplacement.toFixed(2));

      ctx.fillStyle = "#4B5563";
      ctx.fillRect(centerX - 40, 0, 80, 20);

      drawSpring(currentDisplacement);

      drawWeight(topY + restLength + currentDisplacement);

      setTime(elapsed.toFixed(2));
      setPeriod((2 * Math.PI * Math.sqrt(mass / springConstant)).toFixed(2));

      if (elapsed % 0.1 < 0.02) {
        setGraphData((prev) => {
          const newData = [
            ...prev,
            { time: elapsed.toFixed(1), displacement: currentDisplacement },
          ];
          if (newData.length > 50) newData.shift();
          return newData;
        });
      }

      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animate(lastTimeRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, mass, springConstant]);

  const handleReset = () => {
    setIsRunning(false);
    startTimeRef.current = null;
    lastTimeRef.current = 0;
    setTime(0);
    setGraphData([]);
  };

  const ControlSlider = ({
    label,
    value,
    onChange,
    min,
    max,
    step,
    icon: Icon,
  }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-blue-600" />
        <label className="text-sm text-gray-600">{label}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-right text-sm text-blue-600 font-medium">
        {value} {label.split("(")[1]?.replace(")", "") || ""}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Spring Oscillations Lab
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full bg-gray-50 rounded-lg"
              />

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                    isRunning
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isRunning ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  <span>{isRunning ? "Stop" : "Start"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-900">
                  Displacement vs Time
                </h2>
                <button
                  onClick={() => setShowGraph(!showGraph)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <LineChart className="h-5 w-5" />
                </button>
              </div>

              {showGraph && (
                <ReChart
                  data={graphData}
                  width={500}
                  height={200}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    label={{
                      value: "Time (s)",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Displacement (m)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="displacement"
                    stroke="#3B82F6"
                    dot={false}
                  />
                </ReChart>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <ControlSlider
              label="Mass (kg)"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              min={0.5}
              max={10}
              step={0.1}
              icon={Weight}
            />
            <ControlSlider
              label="Spring Constant (N/m)"
              value={springConstant}
              onChange={(e) => setSpringConstant(Number(e.target.value))}
              min={1}
              max={100}
              step={1}
              icon={ArrowUpDown}
            />
          </div>
        </div>

        {/* "Next Experiment" Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/physics1")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Next Experiment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhysicsLab;
