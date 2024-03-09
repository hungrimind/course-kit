import React from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import type { MarkdownSectionProps } from "./Course"

const MarkdownSection: React.FC<MarkdownSectionProps> = (props) => {
  return (
    <div className="coursekit-h-full coursekit-w-full coursekit-flex coursekit-flex-col coursekit-justify-center coursekit-items-center coursekit-text-center">
      <Markdown className="md:coursekit-w-1/2" rehypePlugins={[rehypeRaw]}>
        {props.content}
      </Markdown>
    </div>
  )
}

export default MarkdownSection
