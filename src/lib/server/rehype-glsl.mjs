import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import glsl from "highlight.js/lib/languages/glsl";

export default [rehypeHighlight, { languages: { ...common, glsl } }];
