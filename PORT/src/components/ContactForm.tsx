import { useState } from "react";
import { Mail, Phone, User, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors: { [key: string]: string } = {};

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
          Accept: "application/json",
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
          const backendErrors: { [key: string]: string } = {};
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
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl bg-slate-100 p-8 shadow-xl">
        {/* Success Screen */}
        {success ? (
          <div className="perspective-1000 mx-auto max-w-xl px-4 py-16">
            <motion.div
              className="relative h-[650px] w-full" // Adjust height as needed
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: success ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* --- FRONT: The Form --- */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 h-full w-full rounded-2xl bg-slate-100 p-8 shadow-xl"
              >
                {/* YOUR FORM JSX GOES HERE */}
              </div>

              {/* --- BACK: Success Screen --- */}
              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className="text-powder-blue-600 absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-xl"
              >
                <CheckCircle size={70} className="mb-6" />
                <h2 className="mb-3 text-3xl font-bold">Message Sent! 🎉</h2>
                <p className="mb-8 text-lg opacity-80">
                  Thanks for reaching out. I'll reply as soon as possible.
                </p>
                <a
                  href="/"
                  className="rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  ← Back to Home
                </a>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-3xl font-bold text-slate-900">Get In Touch</h1>
            <p className="mb-8 text-slate-500">
              Fill in the form below and I'll get back to you soon.
            </p>

            {/* Server Error Message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 text-red-500" size={20} />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 🔥 FIXED: Moved bg-white inside className */}
            <form onSubmit={handleSubmit} className="space-y-5 bg-white">
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm transition focus:outline-none focus:ring-1 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm transition focus:outline-none focus:ring-1 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={12} />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm transition focus:outline-none focus:ring-1 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Your Message *
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Hi Nithish, I'd like to discuss..."
                    className={`w-full resize-none rounded-xl border bg-white py-3 pl-10 pr-4 text-sm transition focus:outline-none focus:ring-1 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900"
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    {/* The icon has its own transition */}
                    <motion.div
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                    >
                      <Send size={16} />
                    </motion.div>
                    <span>Send Message</span>
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
