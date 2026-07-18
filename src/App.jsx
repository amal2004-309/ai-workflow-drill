import { useState, useMemo } from "react";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = [
  "bg-slate-200",
  "bg-rose-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-teal-600",
];

export default function UserSettingsForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const strength = useMemo(
    () => getPasswordStrength(values.password),
    [values.password]
  );

  const errors = useMemo(() => {
    const e = {};

    if (!values.username) {
      e.username = "Username is required.";
    } else if (!USERNAME_RE.test(values.username)) {
      e.username =
        "3–20 characters, letters, numbers, and underscores only.";
    }

    if (!values.email) {
      e.email = "Email is required.";
    } else if (!EMAIL_RE.test(values.email)) {
      e.email = "Enter a valid email address.";
    }

    if (!values.password) {
      e.password = "Password is required.";
    } else if (values.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }

    if (!values.confirmPassword) {
      e.confirmPassword = "Confirm your password.";
    } else if (values.confirmPassword !== values.password) {
      e.confirmPassword = "Passwords don't match.";
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setSubmitted(false);
    };
  }

  function handleBlur(field) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (isValid) {
      setSubmitted(true);
    }
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-slate-200 p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Account settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Update your username, email, and password.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={values.username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
            placeholder="jane_doe"
            className={`w-full h-10 px-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-teal-100 ${
              showError("username")
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-300 focus:border-teal-600"
            }`}
            aria-invalid={Boolean(showError("username"))}
            aria-describedby="username-error"
          />
          {showError("username") && (
            <p id="username-error" className="mt-1.5 text-xs text-rose-600">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="jane@company.com"
            className={`w-full h-10 px-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-teal-100 ${
              showError("email")
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-300 focus:border-teal-600"
            }`}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby="email-error"
          />
          {showError("email") && (
            <p id="email-error" className="mt-1.5 text-xs text-rose-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="At least 8 characters"
            className={`w-full h-10 px-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-teal-100 ${
              showError("password")
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-300 focus:border-teal-600"
            }`}
            aria-invalid={Boolean(showError("password"))}
            aria-describedby="password-error"
          />

          {/* Strength meter */}
          {values.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < strength ? STRENGTH_COLORS[strength] : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-500 w-14 text-right">
                {STRENGTH_LABELS[strength]}
              </span>
            </div>
          )}

          {showError("password") && (
            <p id="password-error" className="mt-1.5 text-xs text-rose-600">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            placeholder="Re-enter your password"
            className={`w-full h-10 px-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-teal-100 ${
              showError("confirmPassword")
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-300 focus:border-teal-600"
            }`}
            aria-invalid={Boolean(showError("confirmPassword"))}
            aria-describedby="confirmPassword-error"
          />
          {showError("confirmPassword") && (
            <p
              id="confirmPassword-error"
              className="mt-1.5 text-xs text-rose-600"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-teal-700 text-white text-sm font-medium hover:bg-teal-800 active:bg-teal-900 transition"
        >
          Save changes
        </button>

        {submitted && (
          <p className="text-sm text-teal-700 text-center">
            Settings saved.
          </p>
        )}
      </form>
    </div>
  );
}