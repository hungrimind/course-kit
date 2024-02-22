import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { HeaderSectionProps } from "./Course";

const HeaderSection: React.FC<HeaderSectionProps> = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center w-full text-center container">
        <div className="text-6xl font-bold pt-16">{props.headline}</div>
        <p className="mt-4 text-2xl">{props.subheadline}</p>
        <img
          className="pt-16 w-full"
          src={`https://hungrimind.com/${props.image}`}
        />
        <div className="md:w-1/2 text-start">
          <Markdown rehypePlugins={[rehypeRaw]}>{props.content}</Markdown>
        </div>

        <div className="flex justify-center p-2 space-x-4">
          {props.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              className="py-2.5 px-5 mt-2 font-medium text-center text-white bg-black dark:text-black dark:bg-white rounded"
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
        <p id="setup" className="mt-16 pb-8 text-2xl">
          ⬅ Click the check button to get started
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
