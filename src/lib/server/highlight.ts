import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);

export function highlightCode(code: string, language: "cpp" | "c"): string {
  try {
    return hljs.highlight(code.trim(), { language }).value;
  } catch {
    return code;
  }
}
