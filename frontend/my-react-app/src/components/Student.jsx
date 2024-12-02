import React from "react";
import {
  Bell,
  Book,
  HelpCircle,
  Download,
  Activity,
  ChevronRight,
  Calendar,
  PlayCircle,
  TrendingUp,
  Grid,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Card Component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-200">{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

// Custom Alert Component
const Alert = ({ children, priority = "low" }) => {
  const borderColors = {
    high: "border-l-red-500",
    medium: "border-l-yellow-500",
    low: "border-l-blue-500",
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 border-l-4 ${borderColors[priority]}`}
    >
      {children}
    </div>
  );
};

// Custom Tabs Components
const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children }) => (
  <div className="flex space-x-1 border-b border-gray-200">{children}</div>
);

const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
  <button
    className={`px-4 py-2 text-sm font-medium ${
      activeTab === value
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-600 hover:text-gray-900"
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return <div className="mt-4">{children}</div>;
};

const StudentDashboard = () => {
  const studentName = "Alex Johnson";
  const academicLevel = "Year 3";

  const progressData = [
    { month: "Sep", grade: 85 },
    { month: "Oct", grade: 88 },
    { month: "Nov", grade: 92 },
    { month: "Dec", grade: 90 },
  ];

  const currentExperiments = [
    {
      id: 1,
      name: "Physics Lab: Wave Motion",
      progress: 75,
      dueDate: "2024-11-10",
    },
    {
      id: 2,
      name: "Chemistry Lab: Titration",
      progress: 30,
      dueDate: "2024-11-15",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "deadline",
      message: "Physics Lab due in 2 days",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "feedback",
      message: "New feedback on Chemistry Lab",
      time: "1 day ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "announcement",
      message: "New Video Tutorial Available",
      time: "3 hours ago",
      priority: "low",
    },
  ];

  const videoTutorials = [
    {
      id: 1,
      title: "Introduction to Wave Motion",
      duration: "5:30",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 2,
      title: "Understanding Titration",
      duration: "8:45",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 3,
      title: "Lab Safety Guidelines",
      duration: "4:15",
      thumbnail: "/api/placeholder/320/180",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {studentName}
        </h1>
        <p className="text-gray-600">
          {academicLevel} • Remote Laboratory Portal
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Experiments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Current Experiments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentExperiments.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{exp.name}</h3>
                      <p className="text-sm text-gray-500">
                        Due: {exp.dueDate}
                      </p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${exp.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="ml-4 p-2 hover:bg-gray-100 rounded-full">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Recent Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videoTutorials.map((video) => (
                  <div key={video.id} className="relative group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-lg w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="mt-2 font-medium">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <Alert key={notif.id} priority={notif.priority}>
                    <div className="font-medium">{notif.message}</div>
                    <div className="text-sm text-gray-500">{notif.time}</div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-blue-600">92%</h3>
                  <p className="text-sm text-gray-600">Average Grade</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">8/10</h3>
                  <p className="text-sm text-gray-600">Experiments Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
