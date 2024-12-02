import React, { useState } from "react";
import {
  Clock,
  Users,
  BookOpen,
  Bell,
  FileText,
  MessageCircle,
  Plus,
  Send,
  Search,
  Filter,
  Calendar,
  MoreVertical,
} from "lucide-react";

const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`pb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const CardTitle = ({ className = "", children }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

const Avatar = ({ className = "", children }) => (
  <div
    className={`bg-blue-600 rounded-full flex items-center justify-center ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ variant = "default", children }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const Button = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-200 text-gray-800 hover:bg-gray-50",
    ghost: "hover:bg-gray-50",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium flex items-center justify-center ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon className="w-4 h-4" />
      </div>
    )}
    <input
      className={`w-full rounded-md border border-gray-200 p-2 ${
        Icon ? "pl-10" : ""
      }`}
      {...props}
    />
  </div>
);

const TeacherDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState("All");

  // Enhanced mock data
  const teacherData = {
    name: "Dr. Sarah Johnson",
    department: "Physics",
    email: "sarah.johnson@university.edu",
    currentLabs: [
      { year: "2024", name: "Physics Lab", semester: "Spring" },
      { year: "2024", name: "Chemistry Lab", semester: "Spring" },
      { year: "2024", name: "Mathematics Lab", semester: "Spring" },
    ],
    students: [
      {
        id: 1,
        name: "Alice Smith",
        roll: "2401",
        attendance: "95%",
        lab: "Physics Lab",
        email: "alice.smith@university.edu",
        phone: "+1234567890",
        performance: "Excellent",
        grade: "A",
      },
      {
        id: 2,
        name: "Bob Johnson",
        roll: "2402",
        attendance: "88%",
        lab: "Chemistry Lab",
        email: "bob.johnson@university.edu",
        phone: "+1234567891",
        performance: "Good",
        grade: "B+",
      },
      {
        id: 3,
        name: "Carol Williams",
        roll: "2403",
        attendance: "92%",
        lab: "Physics Lab",
        email: "carol.williams@university.edu",
        phone: "+1234567892",
        performance: "Excellent",
        grade: "A",
      },
      {
        id: 4,
        name: "David Brown",
        roll: "2404",
        attendance: "78%",
        lab: "Mathematics Lab",
        email: "david.brown@university.edu",
        phone: "+1234567893",
        performance: "Needs Improvement",
        grade: "C",
      },
      {
        id: 5,
        name: "Emma Davis",
        roll: "2405",
        attendance: "91%",
        lab: "Chemistry Lab",
        email: "emma.davis@university.edu",
        phone: "+1234567894",
        performance: "Very Good",
        grade: "A-",
      },
    ],
    remarks: {
      2401: [
        {
          date: "2024-04-01",
          type: "Performance",
          content: "Excellent understanding of wave mechanics concepts.",
        },
        {
          date: "2024-03-28",
          type: "Participation",
          content: "Active participation in group discussions.",
        },
      ],
      PH2402: [
        {
          date: "2024-03-30",
          type: "Assignment",
          content: "Late submission of lab report, but quality work.",
        },
        {
          date: "2024-03-25",
          type: "Behavior",
          content: "Shows great initiative in helping peers.",
        },
      ],
    },
  };

  const [remarks, setRemarks] = useState(teacherData.remarks);
  const [newRemark, setNewRemark] = useState({
    type: "Performance",
    content: "",
  });

  const addRemark = (studentId) => {
    if (newRemark.content.trim()) {
      const rollNumber = teacherData.students.find(
        (s) => s.id === studentId
      )?.roll;
      if (rollNumber) {
        setRemarks((prev) => ({
          ...prev,
          [rollNumber]: [
            { date: new Date().toISOString().split("T")[0], ...newRemark },
            ...(prev[rollNumber] || []),
          ],
        }));
        setNewRemark({ type: "Performance", content: "" });
      }
    }
  };

  const filteredStudents = teacherData.students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLab = selectedLab === "All" || student.lab === selectedLab;
    return matchesSearch && matchesLab;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <Card className="flex-1 mr-4">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="w-16 h-16">
              <div className="font-semibold text-2xl text-white">
                {teacherData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                Welcome back, {teacherData.name}
              </CardTitle>
              <p className="text-gray-500">
                {teacherData.department} Department
              </p>
              <p className="text-gray-500">{teacherData.email}</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-lg">Current Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">Spring 2024</div>
            <p className="text-gray-500 mt-1">3 Active Labs</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="flex space-x-4">
        <Input
          icon={Search}
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          className="border rounded-md px-4 py-2"
          value={selectedLab}
          onChange={(e) => setSelectedLab(e.target.value)}
        >
          <option value="All">All Labs</option>
          {teacherData.currentLabs.map((lab) => (
            <option key={lab.name} value={lab.name}>
              {lab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
            </div>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" /> Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Roll No</th>
                  <th className="pb-3">Lab</th>
                  <th className="pb-3">Attendance</th>
                  <th className="pb-3">Performance</th>
                  <th className="pb-3">Grade</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-3">{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.lab}</td>
                    <td>
                      <Badge
                        variant={
                          parseInt(student.attendance) >= 90
                            ? "success"
                            : parseInt(student.attendance) >= 80
                            ? "warning"
                            : "danger"
                        }
                      >
                        {student.attendance}
                      </Badge>
                    </td>
                    <td>{student.performance}</td>
                    <td>{student.grade}</td>
                    <td>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Remarks
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Remarks Dialog */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Remarks - {selectedStudent.name}
              </h2>
              <Button variant="ghost" onClick={() => setSelectedStudent(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <select
                  className="border rounded-md px-4 py-2"
                  value={newRemark.type}
                  onChange={(e) =>
                    setNewRemark((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option>Performance</option>
                  <option>Behavior</option>
                  <option>Attendance</option>
                  <option>Assignment</option>
                  <option>Participation</option>
                </select>
                <input
                  className="flex-1 border rounded-md px-4 py-2"
                  placeholder="Add a new remark..."
                  value={newRemark.content}
                  onChange={(e) =>
                    setNewRemark((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
                <Button onClick={() => addRemark(selectedStudent.id)}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {(remarks[selectedStudent.roll] || []).map((remark, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline">{remark.type}</Badge>
                      <span className="text-sm text-gray-500">
                        {remark.date}
                      </span>
                    </div>
                    <p>{remark.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
