import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Ruler,
  ArrowDownCircle,
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

const PendulumLab = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [length, setLength] = useState(200);
  const [gravity, setGravity] = useState(9.81);
  const [angle, setAngle] = useState(0);
  const [time, setTime] = useState(0);
  const [period, setPeriod] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState(true);

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastTimeRef = useRef(0);

  const initialAngle = Math.PI / 6; // 30 degrees
  const dampingFactor = 0.998; // Slight damping for realism

  const calculatePendulumPosition = (t) => {
    const angularFrequency = Math.sqrt(gravity / (length / 100));
    const amplitude = initialAngle;
    const angle =
      amplitude *
      Math.cos(angularFrequency * t) *
      Math.pow(dampingFactor, t * 60);
    return angle;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const topY = 50;

    const drawPendulum = (currentAngle) => {
      const pendulumLength = length;
      const bobX = centerX + Math.sin(currentAngle) * pendulumLength;
      const bobY = topY + Math.cos(currentAngle) * pendulumLength;

      // Draw pivot point
      ctx.beginPath();
      ctx.arc(centerX, topY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#4B5563";
      ctx.fill();

      // Draw string with shadow
      ctx.beginPath();
      ctx.moveTo(centerX, topY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#666666";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw bob with gradient and shadow
      const bobRadius = 25;
      const gradient = ctx.createRadialGradient(
        bobX,
        bobY,
        0,
        bobX,
        bobY,
        bobRadius
      );
      gradient.addColorStop(0, "#EC4899");
      gradient.addColorStop(1, "#BE185D");

      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add shine effect
      const shineGradient = ctx.createLinearGradient(
        bobX - bobRadius,
        bobY - bobRadius,
        bobX + bobRadius,
        bobY + bobRadius
      );
      shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      shineGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");

      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fillStyle = shineGradient;
      ctx.fill();

      ctx.shadowColor = "transparent";
    };

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentAngle = calculatePendulumPosition(elapsed);
      setAngle(((currentAngle * 180) / Math.PI).toFixed(2));

      drawPendulum(currentAngle);

      setTime(elapsed.toFixed(2));
      setPeriod((2 * Math.PI * Math.sqrt(length / 100 / gravity)).toFixed(2));

      if (elapsed % 0.1 < 0.02) {
        setGraphData((prev) => {
          const newData = [
            ...prev,
            {
              time: elapsed.toFixed(1),
              angle: ((currentAngle * 180) / Math.PI).toFixed(2),
            },
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
  }, [isRunning, length, gravity]);

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
        <Icon className="w-4 h-4 text-pink-600" />
        <label className="text-sm text-gray-600">{label}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-right text-sm text-pink-600 font-medium">
        {value} {label.split("(")[1]?.replace(")", "") || ""}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-900 mb-6">
          Pendulum Physics Lab
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
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
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-pink-900">
                  Angle vs Time
                </h2>
                <button
                  onClick={() => setShowGraph(!showGraph)}
                  className="text-pink-600 hover:text-pink-700"
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
                      value: "Angle (degrees)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="angle"
                    stroke="#EC4899"
                    dot={false}
                  />
                </ReChart>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <ControlSlider
              label="Pendulum Length (cm)"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={100}
              max={300}
              step={10}
              icon={Ruler}
            />
            <ControlSlider
              label="Gravity (m/s²)"
              value={gravity}
              onChange={(e) => setGravity(Number(e.target.value))}
              min={1}
              max={20}
              step={0.1}
              icon={ArrowDownCircle}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-gray-600">Current Time</div>
            <div className="text-2xl font-bold text-pink-600">{time}s</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-gray-600">Period</div>
            <div className="text-2xl font-bold text-pink-600">{period}s</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-gray-600">Current Angle</div>
            <div className="text-2xl font-bold text-pink-600">{angle}°</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumLab;
