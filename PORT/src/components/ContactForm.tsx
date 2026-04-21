import { useState } from "react";
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name (min 2 characters)";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (if provided)
    if (form.phone) {
      const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
      if (!phoneRegex.test(form.phone)) {
        newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      }
    }

    // Message validation
    if (!form.message || form.message.trim().length < 10) {
      newErrors.message = "Please enter a valid message (min 10 characters)";
    }

    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});
    setError("");
    setLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form),
      });

      // 🔥 CRITICAL FIX: Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      let data: any = {};
      
      if (isJson) {
        data = await response.json();
      } else {
        // Laravel crashed and returned HTML (500 error page)
        const text = await response.text();
        console.error("Laravel returned HTML (not JSON):", text.substring(0, 500));
        setError(`Server error (${response.status}). Check Laravel logs.`);
        setLoading(false);
        return;
      }

      if (response.ok && data.success) {
        setSuccess(true);
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        // Handle validation errors (422) or other backend errors
        if (data.errors) {
          // Laravel validation errors
          const backendErrors: {[key: string]: string} = {};
          Object.entries(data.errors).forEach(([key, value]) => {
            backendErrors[key] = Array.isArray(value) ? value[0] : String(value);
          });
          setErrors(backendErrors);
        } else {
          setError(data.message || "Failed to send message. Please try again.");
        }
        console.error("Server Error:", data);
      }
    } catch (err: any) {
      // This ONLY catches true network failures (server offline, CORS blocked)
      console.error("Network Error:", err);
      setError("Network error. Make sure Laravel server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-slate-100 shadow-xl rounded-2xl p-8">
        {/* Success Screen */}
        {success ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <CheckCircle size={70} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Message Sent! 🎉</h2>
            <p className="text-slate-500 text-lg mb-8">
              Thanks for reaching out. I'll reply as soon as possible.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition"
            >
              ← Back to Home
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Get In Touch</h1>
            <p className="text-slate-500 mb-8">
              Fill in the form below and I'll get back to you soon.
            </p>

            {/* Server Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* 🔥 FIXED: Moved bg-white inside className */}
            <form onSubmit={handleSubmit} className="space-y-5 bg-white">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none bg-white focus:ring-1 transition ${
                      errors.name 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none bg-white focus:ring-1 transition ${
                      errors.phone 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none bg-white focus:ring-1 transition ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Your Message *
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Hi Nithish, I'd like to discuss..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none bg-white focus:ring-1 transition resize-none ${
                      errors.message 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}