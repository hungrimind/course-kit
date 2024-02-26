import Prism from "prismjs";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import "../customprism.css";
import type { SlideSectionProps } from "./Course";

interface SlideSectionPageProps {
  content: SlideSectionProps;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previewOpen: boolean;
}

const SlideSection: React.FC<SlideSectionPageProps> = (props) => {
  useEffect(() => {
    console.log("highlighting in package");
    Prism.highlightAll();
  });

  return (
    <div className="relative flex h-full w-full">
      <div
        className={`${
          props.previewOpen ? "backdrop-blur" : "opacity-0 hidden"
        } transition-opacity absolute w-full h-full z-10`}
      ></div>
      <section className="hidden sm:flex w-full">
        <DesktopView
          content={props.content}
          previewOpen={props.previewOpen}
          setPreviewOpen={props.setPreviewOpen}
        />
      </section>
      <section className="sm:hidden w-full">
        <MobileView
          content={props.content}
          previewOpen={props.previewOpen}
          setPreviewOpen={props.setPreviewOpen}
        />
      </section>
    </div>
  );
};

const DesktopView: React.FC<ViewProps> = ({ content, previewOpen }) => {
  return (
    <div className="flex overflow-y-auto h-full w-full items-center relative">
      <div className="content-section w-1/2 my-auto py-16">
        <h2 className="px-4 text-4xl font-bold">{content.heading}</h2>
        <p className="px-4">
          <Markdown rehypePlugins={[rehypeRaw]}>{content.content}</Markdown>
        </p>
      </div>

      <CodeImageThing content={content}></CodeImageThing>

      <div
        className={`${
          previewOpen ? "scale-100" : "scale-0"
        } transition-transform absolute left-0 right-0 bottom-0 top-0 z-100 flex justify-center items-center z-20`}
      >
        <img
          className="shadow-2xl mb-2 rounded-xl h-4/5"
          src={`../../../${content?.previewImage}`}
          alt="Preview"
        />
      </div>
    </div>
  );
};

interface ViewProps {
  content: SlideSectionProps;
  previewOpen: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileView: React.FC<ViewProps> = ({ content }) => {
  return (
    <>
      <div className="content-section overflow-hidden">
        <div>
          <h2
            className={`px-4 text-4xl font-bold sm:transition-opacity duration-500`}
          >
            {content?.heading}
          </h2>
          <p className={`px-4 sm:transition-opacity duration-500 `}>
            <Markdown rehypePlugins={[rehypeRaw]}>{content?.content}</Markdown>
          </p>
          <div className="h-96"></div>
        </div>
      </div>

      <CodeImageThing content={content}></CodeImageThing>
    </>
  );
};

interface CodeImageThingProps {
  content?: SlideSectionProps;
}

function CodeImageThing({ content }: CodeImageThingProps) {
  function highlightTranslator(type: string): string {
    if (type === "flutter") {
      return "language-dart";
    }

    return `language-${type}`;
  }

  return (
    <div className="sticky top-0 h-full sm:block sm:w-1/2">
      <div className="overflow-visible h-full bg-neutral-50 dark:bg-neutral-900 relative rounded-xl">
        {(() => {
          switch (content?.type) {
            case "image":
              return (
                <div className="flex justify-center items-center p-4 mb-20 h-full">
                  <img
                    className="object-contain max-h-full rounded-xl"
                    src={`/${content.value}`}
                    alt="Comment"
                  />
                </div>
              );
            case "text" || "html":
              return (
                <div className="flex justify-start items-center p-4 h-full text-white">
                  {content.value}
                </div>
              );
            case "md":
            case "yaml":
            case "flutter":
              return (
                <div className="overflow-y-auto h-full text-white flex flex-col">
                  {content?.file !== undefined && (
                    <div className=" dark:bg-neutral-900 text-black dark:text-white px-4 py-1">
                      {content.file}
                    </div>
                  )}
                  <pre
                    className="line-numbers flex-1"
                    data-line={content.highlight ?? ""}
                  >
                    <code
                      className={`pl-0 ${highlightTranslator(content.type)}`}
                    >
                      {content.value}
                    </code>
                  </pre>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default SlideSection;
