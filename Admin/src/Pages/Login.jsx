import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/tatto/admin/login", {
        username,
        password,
      });

      if (!res.data.token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "Server error. Please try again."
        );
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute w-[430px] h-[520px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-blue-700 to-blue-400 rounded-full -left-20 -top-20 animate-float"></div>
        <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full -right-8 -bottom-20 animate-float-delay"></div>
      </div>

      {/* Login form */}
      <form 
        onSubmit={loginAdmin}
        className="relative w-full max-w-[400px] bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-8 z-10"
      >
        <h3 className="text-white text-2xl font-bold text-center mb-8">Login Here</h3>

        {error && (
          <div className="mb-6 bg-red-500/20 text-red-100 px-4 py-3 rounded-lg text-sm border border-red-500/30">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="username" className="block text-white/80 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Email or Phone"
            className="w-full h-12 bg-white/5 rounded-lg px-4 text-white placeholder-white/40 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full h-12 bg-white/5 rounded-lg px-4 text-white placeholder-white/40 border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg mt-8 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          {loading ? (
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            "Log In"
          )}
        </button>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;