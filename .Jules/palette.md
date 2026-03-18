## 2024-05-20 - Unhiding Secondary Input Text
**Learning:** Hiding secondary descriptive text (like scenario descriptions for radio buttons) from screen readers using `aria-hidden="true"` deprives users of critical context needed to make informed choices.
**Action:** Always associate secondary explanatory text with its input using `aria-describedby` so screen reader users hear the full context when focusing the input.
