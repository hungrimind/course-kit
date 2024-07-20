import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { HeaderSectionProps } from "./Course";

const HeaderSection: React.FC<HeaderSectionProps> = (props) => {
  return (
    <div className="coursekit-px-2 md:coursekit-px-4">
      <div className="coursekit-flex coursekit-flex-col coursekit-pb-16  coursekit-max-w-4xl coursekit-mx-auto">
        <div className="coursekit-text-5xl md:coursekit-text-6xl coursekit-font-bold coursekit-pt-32">
          {props.headline}
        </div>
        <p className="coursekit-mt-4 coursekit-text-xl md:coursekit-text-2xl">
          {props.subheadline}
        </p>
        <img
          className="coursekit-pt-16 md:coursekit-max-w-7xl md:coursekit-px-8 coursekit-pb-8 coursekit-max-h-[600px] coursekit-my-4"
          src={
            props.image.startsWith("http")
              ? props.image
              : `https://hungrimind.com/${props.image}`
          }
        />
        <div className="coursekit-w-full content-section ">
          <Markdown rehypePlugins={[rehypeRaw]}>{props.content}</Markdown>
        </div>

        <div className="coursekit-flex coursekit-p-2 coursekit-space-x-4">
          {props.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              className="coursekit-py-2.5 coursekit-px-5 coursekit-mt-2 coursekit-font-medium coursekit-text-center coursekit-text-white coursekit-bg-black dark:coursekit-text-black dark:coursekit-bg-white coursekit-rounded"
            >
              {(() => {
                switch (link.type) {
                  case "github":
                    return <div>Course Code</div>;
                  case "discord":
                    return <div>Join Community</div>;
                  default:
                    return <div>Error</div>;
                }
              })()}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
