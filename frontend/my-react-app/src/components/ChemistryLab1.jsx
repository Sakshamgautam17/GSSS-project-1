import React, { useState, useEffect } from "react";
import { Beaker, RotateCcw, Play, Pause } from "lucide-react";

const GasEvolutionLab = () => {
  const [selectedReagent1, setSelectedReagent1] = useState("");
  const [selectedReagent2, setSelectedReagent2] = useState("");
  const [isReacting, setIsReacting] = useState(false);
  const [balloonSize, setBalloonSize] = useState(0);
  const [bubbleCount, setBubbleCount] = useState([]);
  const [message, setMessage] = useState("Select your reagents to begin");

  const reagents = {
    "Zinc Metal": "gray",
    "Hydrochloric Acid": "colorless",
    "Sodium Bicarbonate": "white",
    Vinegar: "colorless",
    "Hydrogen Peroxide": "colorless",
    Yeast: "tan",
  };

  const reactions = {
    "Zinc Metal-Hydrochloric Acid": {
      gas: "Hydrogen",
      equation: "Zn + 2HCl → ZnCl₂ + H₂↑",
      color: "rgb(200, 200, 200)",
      rate: 1.5,
    },
    "Sodium Bicarbonate-Vinegar": {
      gas: "Carbon Dioxide",
      equation: "NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑",
      color: "rgb(240, 240, 240)",
      rate: 1.2,
    },
    "Hydrogen Peroxide-Yeast": {
      gas: "Oxygen",
      equation: "2H₂O₂ → 2H₂O + O₂↑ (catalyzed by catalase)",
      color: "rgb(220, 220, 220)",
      rate: 1,
    },
  };

  useEffect(() => {
    let interval;
    if (isReacting) {
      const reaction = getReactionResult();
      if (reaction) {
        interval = setInterval(() => {
          setBalloonSize((prev) => Math.min(prev + reaction.rate, 100));
          if (Math.random() > 0.7) {
            addBubble();
          }
        }, 50);
      }
    }
    return () => clearInterval(interval);
  }, [isReacting]);

  const getReactionResult = () => {
    const key = `${selectedReagent1}-${selectedReagent2}`;
    return (
      reactions[key] || reactions[`${selectedReagent2}-${selectedReagent1}`]
    );
  };

  const addBubble = () => {
    setBubbleCount((prev) =>
      [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 80 + 10,
          size: Math.random() * 10 + 5,
        },
      ].slice(-15)
    );
  };

  const handleStart = () => {
    if (!selectedReagent1 || !selectedReagent2) {
      setMessage("Please select both reagents first");
      return;
    }

    const result = getReactionResult();
    if (result) {
      setIsReacting(true);
      setMessage(`Producing ${result.gas} gas!\n${result.equation}`);
    } else {
      setMessage("These reagents do not produce a gas when mixed.");
    }
  };

  const reset = () => {
    setSelectedReagent1("");
    setSelectedReagent2("");
    setIsReacting(false);
    setBalloonSize(0);
    setBubbleCount([]);
    setMessage("Select your reagents to begin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Gas Evolution Lab
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg">
            <div className="relative h-96 bg-blue-50 rounded-lg p-4 flex justify-center">
              {/* Balloon */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div
                  className="bg-red-400 rounded-full transition-all duration-300 opacity-80"
                  style={{
                    width: `${balloonSize}px`,
                    height: `${balloonSize}px`,
                    transform: `scale(${0.2 + balloonSize / 100})`,
                  }}
                />
                <div className="w-4 h-8 bg-gray-400 mx-auto -mt-1" />
              </div>

              {/* Reaction vessel */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-40 relative">
                  <div
                    className="absolute bottom-0 w-full h-full rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isReacting
                        ? getReactionResult()?.color || "rgb(200, 200, 200)"
                        : "rgb(240, 240, 240)",
                      clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    {/* Bubbles */}
                    {bubbleCount.map((bubble) => (
                      <div
                        key={bubble.id}
                        className="absolute bg-white rounded-full animate-rise opacity-60"
                        style={{
                          left: `${bubble.left}%`,
                          width: `${bubble.size}px`,
                          height: `${bubble.size}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <select
                value={selectedReagent1}
                onChange={(e) => setSelectedReagent1(e.target.value)}
                className="p-2 rounded border"
                disabled={isReacting}
              >
                <option value="">Select Reagent 1</option>
                {Object.keys(reagents).map((reagent) => (
                  <option key={reagent} value={reagent}>
                    {reagent}
                  </option>
                ))}
              </select>

              <select
                value={selectedReagent2}
                onChange={(e) => setSelectedReagent2(e.target.value)}
                className="p-2 rounded border"
                disabled={isReacting}
              >
                <option value="">Select Reagent 2</option>
                {Object.keys(reagents).map((reagent) => (
                  <option key={reagent} value={reagent}>
                    {reagent}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() =>
                  isReacting ? setIsReacting(false) : handleStart()
                }
                className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                  isReacting
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isReacting ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Start Reaction</span>
                  </>
                )}
              </button>

              <button
                onClick={reset}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Instructions
              </h2>
              <ol className="space-y-2 list-decimal list-inside text-gray-600">
                <li>Select your first reagent from the dropdown menu</li>
                <li>Select your second reagent from the dropdown menu</li>
                <li>Click "Start Reaction" to begin gas evolution</li>
                <li>Observe the bubble formation and balloon inflation</li>
                <li>Read the balanced equation for the reaction</li>
                <li>Click "Reset" to try another combination</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Reaction Information
              </h2>
              <div className="min-h-24 text-gray-600 whitespace-pre-line">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasEvolutionLab;
