import { useState, useMemo } from "react";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUsername(value) {
  if (!value) return "Username is required.";
  if (!USERNAME_RE.test(value)) {
    return "3–20 characters, letters, numbers, and underscores only.";
  }
  return null;
}

function validateEmail(value) {
  if (!value) return "Email is required.";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address.";
  return null;
}

function validatePassword(value) {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Must be at least 8 characters.";
  if (!/[A-Z]/.test(value)) return "Must include an uppercase letter.";
  if (!/[a-z]/.test(value)) return "Must include a lowercase letter.";
  if (!/\d/.test(value)) return "Must include a number.";
  if (!/[^A-Za-z0-9]/.test(value)) return "Must include a special character.";
  return null;
}

function validateConfirmPassword(value, password) {
  if (!value) return "Confirm your password.";
  if (value !== password) return "Passwords don't match.";
  return null;
}

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

  const errors = useMemo(
    () => ({
      username: validateUsername(values.username),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmPassword(
        values.confirmPassword,
        values.password
      ),
    }),
    [values]
  );

  const strength = useMemo(
    () => getPasswordStrength(values.password),
    [values.password]
  );

  const isValid = Object.values(errors).every((e) => e === null);

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (submitted) setSubmitted(false);
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
    if (isValid) setSubmitted(true);
  }

  function showError(field) {
    return Boolean(touched[field] && errors[field]);
  }

  function inputClasses(field) {
    const base =
      "w-full h-10 px-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2";
    return showError(field)
      ? `${base} border-rose-400 focus:border-rose-500 focus:ring-rose-100`
      : `${base} border-slate-300 focus:border-teal-600 focus:ring-teal-100`;
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

      {submitted && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 px-4 py-3 text-sm text-teal-800"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
          Settings saved.
        </div>
      )}

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
            className={inputClasses("username")}
            aria-invalid={showError("username")}
            aria-describedby={showError("username") ? "username-error" : undefined}
          />
          {showError("username") && (
            <p id="username-error" role="alert" className="mt-1.5 text-xs text-rose-600">
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
            className={inputClasses("email")}
            aria-invalid={showError("email")}
            aria-describedby={showError("email") ? "email-error" : undefined}
          />
          {showError("email") && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-rose-600">
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
            className={inputClasses("password")}
            aria-invalid={showError("password")}
            aria-describedby={showError("password") ? "password-error" : undefined}
          />

          {values.password && (
            <div
              className="mt-2 flex items-center gap-2"
              aria-live="polite"
            >
              <div className="flex gap-1 flex-1" aria-hidden="true">
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
            <p id="password-error" role="alert" className="mt-1.5 text-xs text-rose-600">
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
            className={inputClasses("confirmPassword")}
            aria-invalid={showError("confirmPassword")}
            aria-describedby={
              showError("confirmPassword") ? "confirmPassword-error" : undefined
            }
          />
          {showError("confirmPassword") && (
            <p
              id="confirmPassword-error"
              role="alert"
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
      </form>
    </div>
  );
}