import React, { useState, useEffect } from "react";
import { Play, RotateCcw, ZapOff, Zap, Battery, Lightbulb } from "lucide-react";

const ElectronicsLab = () => {
  const [circuitOn, setCircuitOn] = useState(false);
  const [voltage, setVoltage] = useState(5);
  const [current, setCurrent] = useState(0);
  const [resistance, setResistance] = useState(100);
  const [electrons, setElectrons] = useState([]);
  const [brightness, setBrightness] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Observe the circuit components: battery, resistor, and LED",
    "Adjust the voltage using the slider",
    "Click 'Power On' to start the current flow",
    "Watch the electron flow and LED brightness change",
    "Try different voltage levels to see the effects",
  ];

  // Generate electrons for animation
  useEffect(() => {
    let interval;
    if (circuitOn) {
      interval = setInterval(() => {
        const newElectron = {
          id: Date.now(),
          position: 0,
          offset: Math.random() * 4 - 2,
        };
        setElectrons((prev) => [...prev, newElectron]);

        // Calculate current based on voltage and resistance (I = V/R)
        const calculatedCurrent = (voltage / resistance).toFixed(2);
        setCurrent(calculatedCurrent);

        // Calculate brightness based on current
        const calculatedBrightness = Math.min(
          (calculatedCurrent / 0.02) * 100,
          100
        );
        setBrightness(calculatedBrightness);
      }, 200 / (voltage / 5));

      // Remove electrons that complete the circuit
      const cleanup = setInterval(() => {
        setElectrons((prev) => prev.filter((e) => Date.now() - e.id < 3000));
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(cleanup);
      };
    } else {
      setElectrons([]);
      setCurrent(0);
      setBrightness(0);
    }
  }, [circuitOn, voltage, resistance]);

  const resetCircuit = () => {
    setCircuitOn(false);
    setVoltage(5);
    setResistance(100);
    setCurrent(0);
    setBrightness(0);
    setElectrons([]);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Virtual Electronics Lab
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg">
            <div className="relative h-96 bg-blue-50 rounded-lg p-4 overflow-hidden">
              {/* Circuit Board Background */}
              <div
                className="absolute inset-0 bg-opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 10px 10px, #e5e5f7 2px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Battery */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-32 border-2 border-gray-400 rounded-lg bg-white flex flex-col justify-between p-2">
                  <Battery
                    className={`w-12 h-12 ${
                      circuitOn ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <div className="text-center font-mono text-sm">
                    {voltage}V
                  </div>
                </div>
              </div>

              {/* Circuit Path */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Main Circuit Path */}
                  <path
                    d="M 100 150 H 200 A 20 20 0 0 1 220 170 V 200 H 300 A 20 20 0 0 1 320 220 V 250 H 80 V 220 A 20 20 0 0 1 100 200 V 150"
                    fill="none"
                    stroke={circuitOn ? "#4CAF50" : "#9CA3AF"}
                    strokeWidth="4"
                    className="transition-colors duration-300"
                  />

                  {/* Resistor */}
                  <path
                    d="M 220 170 L 240 160 L 260 180 L 280 160 L 300 180"
                    fill="none"
                    stroke="#4B5563"
                    strokeWidth="3"
                  />
                </svg>

                {/* Animated Electrons */}
                {electrons.map((electron) => (
                  <div
                    key={electron.id}
                    className="absolute w-2 h-2 rounded-full bg-blue-400 transition-transform duration-300 animate-pulse"
                    style={{
                      left: "100px",
                      top: "150px",
                      transform: `translate(${electron.position}px, ${electron.offset}px)`,
                      animation: "electronFlow 3s linear forwards",
                    }}
                  />
                ))}
              </div>

              {/* LED */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <Lightbulb
                    className={`w-16 h-16 transition-colors duration-300 ${
                      circuitOn ? "text-yellow-400" : "text-gray-400"
                    }`}
                    style={{
                      filter: circuitOn
                        ? `brightness(${100 + brightness}%)`
                        : "none",
                    }}
                  />
                  {circuitOn && (
                    <div
                      className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse"
                      style={{
                        opacity: brightness / 200,
                        animation: "glowPulse 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => {
                    setCircuitOn(!circuitOn);
                    setStep((prev) => prev + 1);
                  }}
                  className={`px-6 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-150 active:scale-95 ${
                    circuitOn
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {circuitOn ? (
                    <ZapOff className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  <span>{circuitOn ? "Power Off" : "Power On"}</span>
                </button>

                <button
                  onClick={resetCircuit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform transition-all duration-150 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Voltage Control ({voltage}V)
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Data Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Instructions
              </h2>
              <ul className="space-y-2">
                {steps.map((instruction, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start space-x-2 ${
                      idx === step
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Measurements
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600">Current (A)</label>
                  <div className="text-2xl font-bold text-blue-900">
                    {current}
                  </div>
                </div>
                <div>
                  <label className="text-gray-600">Resistance (Ω)</label>
                  <div className="text-2xl font-bold text-blue-900">
                    {resistance}
                  </div>
                </div>
                <div>
                  <label className="text-gray-600">Power (W)</label>
                  <div className="text-2xl font-bold text-blue-900">
                    {(current * voltage).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes electronFlow {
          0% {
            transform: translate(0, var(--offset));
          }
          25% {
            transform: translate(200px, var(--offset));
          }
          50% {
            transform: translate(200px, 100px);
          }
          75% {
            transform: translate(-20px, 100px);
          }
          100% {
            transform: translate(-20px, 0);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default ElectronicsLab;
