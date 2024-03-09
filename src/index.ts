import Prism from "prismjs";
import "./customprism.css";
import "./global.css";

Prism.highlightAll();

export { Course } from "../src/components/Course";

export type { CourseProps, HeaderSectionProps, MarkdownSectionProps, Section, SlideSectionProps } from "../src/components/Course";

