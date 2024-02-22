import React from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import type { MarkdownSectionProps } from "./Course"

const MarkdownSection: React.FC<MarkdownSectionProps> = (props) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center">
      <Markdown className="md:w-1/2" rehypePlugins={[rehypeRaw]}>
        {props.content}
      </Markdown>
    </div>
  )
}

export default MarkdownSection
