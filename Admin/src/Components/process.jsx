import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Trash2, Plus, X, Info, List, Edit3 } from "lucide-react";

const AdminProcess = () => {
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const res = await axios.get("/api/tatto/process");
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setProcess(
          data || {
            subtitle: "",
            title: "",
            description: "",
            highlights: [],
            steps: [],
          }
        );
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch process data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProcess();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcess({ ...process, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const highlights = [...process.highlights];
    highlights[index] = value;
    setProcess({ ...process, highlights });
  };

  const addHighlight = () => {
    setProcess({ ...process, highlights: [...process.highlights, ""] });
  };

  const removeHighlight = (index) => {
    const highlights = process.highlights.filter((_, i) => i !== index);
    setProcess({ ...process, highlights });
  };

  const handleStepChange = (index, field, value) => {
    const steps = [...process.steps];
    steps[index][field] = value;
    setProcess({ ...process, steps });
  };

  const addStep = () => {
    setProcess({
      ...process,
      steps: [
        ...process.steps,
        {
          stepNumber: process.steps.length + 1,
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeStep = (index) => {
    const steps = process.steps.filter((_, i) => i !== index);
    const renumbered = steps.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setProcess({ ...process, steps: renumbered });
  };

const handleSave = async () => {
  try {
    if (process._id) {
      // Update existing process
      await axios.put(`/api/tatto/process/${process._id}`, process);
      setMessage("Process updated successfully!");
    } else {
      // Create new process
      const res = await axios.post("/api/tatto/process", process);
      setProcess(res.data); // To get _id and use it later for updates
      setMessage("Process created successfully!");
    }
  } catch (error) {
    console.error(error);
    setMessage("Failed to save process.");
  } finally {
    setTimeout(() => setMessage(""), 3000);
  }
};


  if (loading || !process) return <p className="text-center py-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Edit3 className="text-indigo-500" size={28} />
            Process Editor
          </h1>
          <p className="text-gray-500 mt-2">Edit how your process is displayed on the website.</p>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-3 text-sm shadow-sm animate-fadeIn">
            {message}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Info & Highlights */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-600">
                <Info size={20} /> Basic Info
              </h2>
              <input
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                value={process.subtitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={process.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <textarea
                name="description"
                rows="4"
                placeholder="Description"
                value={process.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* Highlights Card */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-600">
                <List size={20} /> Highlights
              </h2>
              <div className="space-y-3">
                {process.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(i, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <button
                      onClick={() => removeHighlight(i)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove highlight"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addHighlight}
                  className="mt-2 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm transition"
                >
                  <Plus className="mr-1" size={16} /> Add Highlight
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-xl font-semibold mb-4 text-pink-600 flex items-center gap-2">
                <List size={20} /> Steps
              </h2>
              {process.steps.map((step, i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-4 rounded-xl bg-slate-50 mb-3 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm text-gray-600">
                      Step {step.stepNumber}
                    </span>
                    <button
                      onClick={() => removeStep(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(i, "title", e.target.value)
                    }
                    className="w-full mb-2 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <textarea
                    placeholder="Description"
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(i, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              ))}
              <button
                onClick={addStep}
                className="w-full mt-2 text-pink-600 hover:text-pink-800 flex items-center justify-center text-sm transition"
              >
                <Plus className="mr-1" size={16} /> Add Step
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-10">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
          >
            <Save className="inline-block mr-2" size={18} /> Save Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProcess;
