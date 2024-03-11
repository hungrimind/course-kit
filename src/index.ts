import Prism from "prismjs";
import "./customprism.css";
import "./global.css";
import "./prism-line-highlight.css";

Prism.highlightAll();

export { Course } from "../src/components/Course";

export type { CourseProps, HeaderSectionProps, MarkdownSectionProps, Section, SlideSectionProps } from "../src/components/Course";

