import Prism from "prismjs";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-highlight/prism-line-highlight";
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
    <div className="coursekit-relative coursekit-flex coursekit-h-full coursekit-w-full">
      <div
        className={`${
          props.previewOpen
            ? "coursekit-backdrop-blur"
            : "coursekit-opacity-0 coursekit-hidden"
        } coursekit-transition-opacity coursekit-absolute coursekit-w-full coursekit-h-full coursekit-z-10`}
      ></div>
      <section className="coursekit-hidden sm:coursekit-flex coursekit-w-full">
        <DesktopView
          content={props.content}
          previewOpen={props.previewOpen}
          setPreviewOpen={props.setPreviewOpen}
        />
      </section>
      <section className="sm:coursekit-hidden coursekit-w-full">
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
    <div className="coursekit-flex coursekit-overflow-y-auto coursekit-h-full coursekit-w-full coursekit-items-center coursekit-relative">
      <div className="content-section coursekit-w-1/2 coursekit-my-auto coursekit-py-16">
        <h2 className="coursekit-px-4 coursekit-text-4xl coursekit-font-bold">
          {content.heading}
        </h2>
        <p className="coursekit-px-4">
          <Markdown rehypePlugins={[rehypeRaw]}>{content.content}</Markdown>
        </p>
      </div>

      <CodeImageThing content={content}></CodeImageThing>

      <div
        className={`${
          previewOpen ? "coursekit-scale-100" : "coursekit-scale-0"
        } coursekit-transition-transform coursekit-absolute coursekit-left-0 coursekit-right-0 coursekit-bottom-0 coursekit-top-0 coursekit-z-100 coursekit-flex coursekit-justify-center coursekit-items-center coursekit-z-20`}
      >
        <img
          className="coursekit-shadow-2xl coursekit-mb-2 coursekit-rounded-xl coursekit-h-4/5"
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
      <div className="content-section coursekit-overflow-hidden">
        <div>
          <h2
            className={`coursekit-px-4 coursekit-text-4xl coursekit-font-bold sm:coursekit-transition-opacity coursekit-duration-500`}
          >
            {content?.heading}
          </h2>
          <p
            className={`coursekit-px-4 sm:coursekit-transition-opacity coursekit-duration-500 `}
          >
            <Markdown rehypePlugins={[rehypeRaw]}>{content?.content}</Markdown>
          </p>
          <div className="coursekit-h-96"></div>
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
    <div className="coursekit-sticky coursekit-top-0 coursekit-h-full sm:coursekit-block sm:coursekit-w-1/2">
      <div className="coursekit-overflow-visible coursekit-h-full coursekit-bg-neutral-50 dark:coursekit-bg-neutral-900 coursekit-relative coursekit-rounded-xl">
        {(() => {
          switch (content?.type) {
            case "image":
              return (
                <div className="coursekit-flex coursekit-justify-center coursekit-items-center coursekit-p-4 coursekit-mb-20 coursekit-h-full">
                  <img
                    className="coursekit-object-contain coursekit-max-h-full coursekit-rounded-xl"
                    src={`/${content.value}`}
                    alt="Comment"
                  />
                </div>
              );
            case "text" || "html":
              return (
                <div className="coursekit-flex coursekit-justify-start coursekit-items-center coursekit-p-4 coursekit-h-full coursekit-text-white">
                  {content.value}
                </div>
              );
            case "md":
            case "yaml":
            case "flutter":
              return (
                <div className="coursekit-overflow-y-auto coursekit-h-full coursekit-text-white coursekit-flex coursekit-flex-col">
                  {content?.file !== undefined && (
                    <div className=" dark:coursekit-bg-neutral-900 coursekit-text-black dark:coursekit-text-white coursekit-px-4 coursekit-py-1">
                      {content.file}
                    </div>
                  )}
                  <pre
                    className="line-numbers coursekit-pl-0 coursekit-flex-1"
                    data-line={content.highlight ?? ""}
                  >
                    <code
                      className={`coursekit-pl-0 ${highlightTranslator(
                        content.type
                      )}`}
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
