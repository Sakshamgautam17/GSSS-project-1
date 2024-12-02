import React, { useState, useEffect } from "react";
import { Beaker, Pipette, Play, RotateCcw, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ChemistryLab = () => {
  const [buretteLevel, setBuretteLevel] = useState(100);
  const [beakerColor, setBeakerColor] = useState("rgb(255, 182, 193)"); // Light pink
  const [dropSpeed, setDropSpeed] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [ph, setPh] = useState(3);
  const [volume, setVolume] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [step, setStep] = useState(0);

  const navigate = useNavigate(); // Initialize navigate

  const steps = [
    "Start by observing the acidic solution (pink) in the beaker.",
    "Click 'Start Titration' to begin adding base from the burette.",
    "Watch the color change as the pH changes.",
    "Try to identify the endpoint (color change to purple).",
    "Click 'Stop' when you think you've reached the endpoint.",
  ];

  useEffect(() => {
    let interval;
    if (isPouring && buretteLevel > 0) {
      interval = setInterval(() => {
        setBuretteLevel((prev) => Math.max(prev - 0.5, 0));
        setVolume((prev) => prev + 0.5);

        const newPh = 3 + volume / 20;
        setPh(Math.min(newPh, 11));

        const r = Math.min(255, Math.max(182 + (ph - 7) * 20, 100));
        const g = Math.min(182, Math.max(182 - Math.abs(ph - 7) * 20, 100));
        const b = Math.min(255, Math.max(193 + (ph - 7) * 20, 100));
        setBeakerColor(`rgb(${r}, ${g}, ${b})`);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPouring, buretteLevel, ph, volume]);

  const resetExperiment = () => {
    setBuretteLevel(100);
    setBeakerColor("rgb(255, 182, 193)");
    setIsPouring(false);
    setPh(3);
    setVolume(0);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Virtual Titration Experiment
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg">
            <div className="relative h-96 bg-blue-50 rounded-lg p-4 flex justify-center">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-64 bg-white border-2 border-gray-300 rounded-b-lg relative">
                  <div
                    className="absolute bottom-0 w-full bg-blue-300 rounded-b transition-all duration-300"
                    style={{ height: `${buretteLevel}%` }}
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-4 bg-gray-300" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4">
                <div className="w-32 h-32 relative">
                  <div
                    className="absolute bottom-0 w-full h-full rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: beakerColor,
                      clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => {
                  setIsPouring(!isPouring);
                  setStep((prev) => prev + 1);
                }}
                className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                  isPouring
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                <Play className="h-4 w-4" />
                <span>{isPouring ? "Stop" : "Start Titration"}</span>
              </button>

              <button
                onClick={resetExperiment}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

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
                  <label className="text-gray-600">Volume Added (mL)</label>
                  <div className="text-2xl font-bold text-blue-900">
                    {volume.toFixed(1)}
                  </div>
                </div>
                <div>
                  <label className="text-gray-600">pH</label>
                  <div className="text-2xl font-bold text-blue-900">
                    {ph.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* New button to navigate to the next experiment */}
            <button
              onClick={() => navigate("/chemistry1")}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 w-full text-center"
            >
              Next Experiment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemistryLab;
