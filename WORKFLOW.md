# AI-Assisted Workflow Drill: Comparison Report

## 1. Correctness & Code Structure
* **Round 1 (Vague Prompt):** The AI generated a monolithic component with inline validation logic using `useMemo`. While it was functional, all configuration (like regular expressions and color mappings) was placed directly in the main file structure without a clear separation of concerns.
* **Round 2 (Precise Prompt):** Followed a strict step-by-step implementation plan. Validation functions (`validateUsername`, `validateEmail`, etc.) were extracted into pure, isolated functions. This architecture makes the code cleaner, highly maintainable, and much easier to unit test.

## 2. Web Accessibility (a11y)
* **Round 1:** Provided basic accessibity with simple `<label htmlFor>` mappings and conditional standard attributes. However, it lacked dynamic screen-reader support.
* **Round 2:** Significantly superior. The AI correctly implemented robust accessibility by dynamically handling `aria-invalid` and `aria-describedby` pointing strictly to existing DOM elements. It also incorporated `aria-live="polite"` on the password strength meter so changes are properly announced to assistive technologies without being disruptive.

## 3. UX & Edge Cases
* **Round 1:** The form handled simple validation on blur and submit, but the success state was a basic text message that remained visible even if the user started typing new changes afterward.
* **Round 2:** Handled advanced UX states perfectly. The success banner appears clearly upon a valid submit, but any subsequent input change immediately resets the submission state, clearing the banner so it doesn't linger confusingly.

## 4. Review Effort & Time Analysis
* **Round 1:** Writing the prompt took less than 30 seconds, but the code generated required dense manual inspection to ensure no hidden bugs were present, resulting in higher review anxiety.
* **Round 2:** Writing the initial prompt and reviewing the text-based implementation plan took about 3-5 minutes. However, because the plan was verified *before* code generation, the final output was completely accurate, saving substantial debugging time later. Spending more time on the prompt drastically reduced the overall engineering effort.

---

# Project AI Rules (Lessons Learned)
Below are three strict rules added to our workflow guidelines based on this drill:
1. **Separation of Validation Logic:** Never write inline validation logic inside components; always extract validation rules into pure, independent functions.
2. **Dynamic Accessibility References:** Always pair error states with dynamic `aria-describedby` IDs that are conditionally verified, ensuring screen readers don't reference missing DOM nodes.
3. **Reactive Success States:** Any global form success banner must automatically clear or reset as soon as the user triggers an `onChange` event on any input field.