import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { MarkdownSectionProps } from "./Course";

const MarkdownSection: React.FC<MarkdownSectionProps> = (props) => {
  return (
    <div className="coursekit-flex coursekit-flex-col coursekit-p-4 coursekit-pb-16 coursekit-max-w-4xl coursekit-mx-auto">
      <div className="content-section">
        <h1>{props.heading}</h1>
        <Markdown rehypePlugins={[rehypeRaw]}>{props.content}</Markdown>
      </div>
    </div>
  );
};

export default MarkdownSection;
