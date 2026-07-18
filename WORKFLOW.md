# AI-Assisted Workflow Drill: Account Settings Form

## 1. Target Task

Building a secure, accessible, and responsive **Account Settings Form** in React using Tailwind CSS with fields for: Username, Email, Password, and Confirm Password.

---

## 2. Prompt Iteration Log

### Iteration 1: Naive Prompt (Base)

- **Prompt:** "اعمل لي فورم إعدادات حساب بالـ React والـ Tailwind فيها اسم المستخدم والإيميل والباسورد وفيها validation."
- **Technique Used:** None (Initial baseline).
- **Observation:** The output would be too generic, mixing all logic inside one component without accessibility standards.

### Iteration 2: Role Assignment

- **Prompt:** "تصرف كمهندس واجهات مستخدم (Frontend Engineer) محترف وخبير في بناء استمارات التسجيل. اعمل لي فورم إعدادات حساب بالـ React والـ Tailwind فيها اسم المستخدم والإيميل والباسورد وفيها validation."
- **Technique Used:** Role Assignment.
- **Observation:** The model adopts industry standards, leading to cleaner code structure and better component separation.

### Iteration 3: Context & Motivation

- **Prompt:** "تصرف كمهندس واجهات مستخدم محترف. أنا بقوم ببناء صفحة إعدادات الحساب لتطبيق ويب حقيقي، والهدف هو تمكين المستخدمين من تحديث بياناتهم بأمان وبأقل نسبة أخطاء. اعمل لي فورم بالـ React والـ Tailwind فيها اسم المستخدم والإيميل والباسورد وتأكيد الباسورد وفيها validation."
- **Technique Used:** Context & Motivation.
- **Observation:** The model pays more attention to UX details and adds security measures like the "Confirm Password" field.

### Iteration 4: Output Structure & Step Decomposition

- **Prompt:** "...(Same as above)... وعند كتابة كود الـ React، اتبع الخطوات التالية بالتسلسل: 1. بناء الـ State الخاصة بالفورم والأخطاء. 2. كتابة دالة الـ Validation لكل حقل بشكل منفصل. 3. بناء تصميم الـ JSX مع إظهار رسائل الخطأ تحت كل حقل. وأريد منك تقسيم المخرجات كالتالي: أولاً كود المكون في ملف `App.jsx` بشكل كامل، ثانياً شرح مبسط لكيفية عمل الـ validation."
- **Technique Used:** Step Decomposition + Structured Output.
- **Observation:** Avoids partial or truncated code, resulting in an production-ready file split into distinct logical parts.

### Iteration 5: Final Optimized Prompt (Few-Shot & Accessibility focus)

- **Prompt:**
  "تصرف كمهندس واجهات مستخدم محترف. أنا بقوم ببناء صفحة إعدادات الحساب لتطبيق ويب حقيقي لتمكين المستخدمين من تحديث بياناتهم بأمان.
  قم ببناء فورم React كاملة باستخدام Tailwind CSS تحتوي على: (Username, Email, Password, Confirm Password).

  _شروط وإرشادات التنفيذ:_
  1. اتبع ممارسات الـ Web Accessibility (a11y) باستخدام aria-invalid و aria-describedby عند حدوث خطأ.
  2. قم بفصل دالة الـ validation لكل حقل بشكل نقي ومستقل (Pure Functions).
  3. أظهر الأخطاء فوراً عند خروج المستخدم من الحقل (onBlur) وعند الضغط على Save.

  _هيكل المخرجات المطلوبة:_
  - كود ملف App.jsx كامل وجاهز للتشغيل.
  - قائمة بالـ Accessibility features التي قمت بتطبيقها."

- **Technique Used:** Complete Prompt Engineering Stack (Role, Context, Decomposition, Constraints, a11y Focus).
- **Observation:** Delivers a fully robust, modular component complying with global web accessibility standards.

---

## 3. Cross-Model Comparison (Claude vs. ChatGPT)

| Feature                  | Claude (Sonnet)                                                                | ChatGPT (GPT-4o)                                            |
| :----------------------- | :----------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **Prompt Adherence**     | Fully followed all constraints and structured output perfectly.                | Missed the `onBlur` validation requirement.                 |
| **Code Modularity**      | Separated validation into pure functions outside the component.                | Combined all validation logic into a single submit handler. |
| **Accessibility (a11y)** | Dynamically implemented `aria-invalid` and tied errors via `aria-describedby`. | Provided very basic inputs with placeholder-only text.      |
| **Styling & Layout**     | Modern card container centered perfectly with robust Tailwind layout.          | Semi-styled with generic flex layouts and inline fallbacks. |

---

## 4. Reusable Prompt Template

```text
Act as a professional Frontend Engineer expert in React and Tailwind CSS.
I am building a [Insert Component Name/Context] for a production application.

Requirements:
1. Include the following interactive fields: [List of fields]
2. Form Validation: Implement validation for [e.g., empty fields, formats, lengths] triggered on [e.g., change, blur, submit].
3. Accessibility: Must strictly follow a11y specs using standard ARIA attributes.

Expected Output:
- Production-ready React code.
- Detailed breakdown of architectural and accessibility choices.
```
