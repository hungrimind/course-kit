import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { HeaderSectionProps } from "./Course";

const HeaderSection: React.FC<HeaderSectionProps> = (props) => {
  return (
    <div>
      <div className="coursekit-flex coursekit-flex-col coursekit-items-center coursekit-w-full coursekit-text-center container">
        <div className="coursekit-text-6xl coursekit-font-bold coursekit-pt-16">{props.headline}</div>
        <p className="coursekit-mt-4 coursekit-text-2xl">{props.subheadline}</p>
        <img
          className="coursekit-pt-16 coursekit-w-full"
          src={`https://hungrimind.com/${props.image}`}
        />
        <div className="md:coursekit-w-1/2 text-start">
          <Markdown rehypePlugins={[rehypeRaw]}>{props.content}</Markdown>
        </div>

        <div className="coursekit-flex coursekit-justify-center coursekit-p-2 coursekit-space-x-4">
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
        <p id="setup" className="coursekit-mt-16 coursekit-pb-8 coursekit-text-2xl">
          ⬅ Click the check button to get started
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
