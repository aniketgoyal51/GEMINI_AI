import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [qualifications, setQualifications] = useState([{ qualification: "", grade: "" }]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  
  // Replace this with your skill and technology mapping
  const skillTechnologies = {
    "Skill1": ["Tech1", "Tech2", "Tech3"],
    "Skill2": ["TechA", "TechB", "TechC"]
  };

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from submitting in the traditional way
    navigate("/app");    // Navigate to the App component
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);
  };

  const handleAddQualification = () => {
    setQualifications([...qualifications, { qualification: "", grade: "" }]);
  };

  const handleRemoveQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
    setSelectedTechnologies([]);
  };

  const handleTechnologyChange = (e) => {
    const value = e.target.value;
    setSelectedTechnologies((prev) =>
      prev.includes(value)
        ? prev.filter((tech) => tech !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <form onSubmit={handleSubmit}>
          {/* Age Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Qualifications and Grades Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Qualifications & Grades</label>
            {qualifications.map((item, index) => (
              <div key={index} className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  value={item.qualification}
                  onChange={(e) =>
                    handleQualificationChange(index, "qualification", e.target.value)
                  }
                  placeholder={`Qualification ${index + 1}`}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={item.grade}
                  onChange={(e) =>
                    handleQualificationChange(index, "grade", e.target.value)
                  }
                  placeholder="Grade"
                  className="w-24 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQualification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  &#10005; {/* Cross Icon */}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQualification}
              className="mt-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add More Qualifications
            </button>
          </div>

          {/* Main Skill Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Select a Skill</label>
            <select
              value={selectedSkill}
              onChange={handleSkillChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="" disabled>Select a Skill</option>
              {Object.keys(skillTechnologies).map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Technology Dropdown with Multi-Select (Checkboxes) */}
          {selectedSkill && (
            <div className="mb-4">
              <label className="block text-gray-700">Select Technologies</label>
              <div className="border p-4 rounded">
                {skillTechnologies[selectedSkill].map((tech, index) => (
                  <label key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      value={tech}
                      checked={selectedTechnologies.includes(tech)}
                      onChange={handleTechnologyChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={()=>{handleSubmit}}
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Dashboard;
