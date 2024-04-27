import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { MarkdownSectionProps } from "./Course";

const MarkdownSection: React.FC<MarkdownSectionProps> = (props) => {
  return (
    <div className="coursekit-h-full coursekit-flex coursekit-flex-col coursekit-p-4 coursekit-pb-16 coursekit-items-center coursekit-justify-center">
      <Markdown className="md:coursekit-w-1/2" rehypePlugins={[rehypeRaw]}>
        {props.content}
      </Markdown>
    </div>
  );
};

export default MarkdownSection;
