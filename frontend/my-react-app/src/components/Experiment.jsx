import React from "react";
import { Beaker, Atom, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import the hook

const ExperimentsPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const experiments = [
    {
      title: "Chemistry Laboratory",
      description:
        "Explore chemical reactions, molecular structures, and laboratory techniques through interactive simulations. Conduct titrations, analyze chemical compounds, and understand reaction mechanisms in a safe virtual environment.",
      icon: Beaker,
      features: [
        "Virtual Titration",
        "Molecular Modeling",
        "Chemical Reactions",
        "Safety Protocols",
      ],
      route: "/chemistry", // Add route for each experiment
    },
    {
      title: "Physics Laboratory",
      description:
        "Investigate fundamental physics principles through virtual experiments. Study mechanics, waves, optics, and electromagnetic phenomena with precise measurements and real-time data visualization.",
      icon: Atom,
      features: [
        "Mechanics Experiments",
        "Wave Analysis",
        "Optical Systems",
        "Electric Circuits",
      ],
      route: "/physics",
    },
    {
      title: "Electronics Laboratory",
      description:
        "Design and test electronic circuits in a risk-free virtual environment. Build digital and analog circuits, analyze signal processing, and learn about semiconductor devices.",
      icon: Cpu,
      features: [
        "Circuit Design",
        "Signal Analysis",
        "Digital Logic",
        "Microcontrollers",
      ],
      route: "/electronics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Virtual Laboratory Experiments
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Experience hands-on learning through our interactive virtual
            laboratories. Choose from various disciplines and conduct
            experiments in a safe, controlled environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiments.map((lab, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {lab.title}
                  </h2>
                  <lab.icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-blue-700">{lab.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {lab.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-blue-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => navigate(lab.route)} // Navigate to the specified route
                >
                  Enter Laboratory
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;
