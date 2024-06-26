import Prism from "prismjs";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import React, { useEffect } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { X } from "lucide-react";
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

const DesktopView: React.FC<ViewProps> = ({
  content,
  previewOpen,
  setPreviewOpen,
}) => {
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
        } coursekit-absolute coursekit-left-0 coursekit-right-0 coursekit-bottom-0 coursekit-top-0 coursekit-flex coursekit-justify-center coursekit-items-center coursekit-z-20`}
      >
        <X
          onClick={() => setPreviewOpen(!previewOpen)}
          className="coursekit-z-20 coursekit-absolute coursekit-top-4 coursekit-right-4 hover:coursekit-cursor-pointer"
        ></X>
        <img
          className={`${
            previewOpen ? "coursekit-scale-100" : "coursekit-scale-0"
          } coursekit-object-contain coursekit-shadow-2xl coursekit-mb-2 coursekit-rounded-xl coursekit-transition-transform coursekit-max-w-[90%] coursekit-max-h-[90%]`}
          src={
            content?.previewImage?.startsWith("http") ?? ""
              ? content?.previewImage
              : `../../../${content?.previewImage}`
          }
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

const MobileView: React.FC<ViewProps> = ({
  content,
  previewOpen,
  setPreviewOpen,
}) => {
  return (
    <>
      <div className="content-section coursekit-overflow-hidden coursekit-p-4">
        <div>
          <h2
            className={` coursekit-text-4xl coursekit-font-bold sm:coursekit-transition-opacity coursekit-duration-500`}
          >
            {content?.heading}
          </h2>
          <p
            className={` coursekit-pb-16 sm:coursekit-transition-opacity coursekit-duration-500 `}
          >
            <Markdown rehypePlugins={[rehypeRaw]}>{content?.content}</Markdown>
          </p>
          <div className="coursekit-h-16"></div>
        </div>
      </div>

      <CodeImageThing content={content}></CodeImageThing>
      <div
        className={`${
          previewOpen ? "coursekit-scale-100" : "coursekit-scale-0"
        } coursekit-absolute coursekit-left-0 coursekit-right-0 coursekit-bottom-0 coursekit-top-0 coursekit-flex coursekit-justify-center coursekit-items-center coursekit-z-20`}
      >
        <X
          onClick={() => setPreviewOpen(!previewOpen)}
          className="coursekit-z-20 coursekit-absolute coursekit-top-4 coursekit-right-4 hover:coursekit-cursor-pointer"
        ></X>
        <img
          className={`${
            previewOpen ? "coursekit-scale-100" : "coursekit-scale-0"
          } coursekit-object-contain coursekit-shadow-2xl coursekit-mb-2 coursekit-rounded-xl coursekit-max-w-[90%] coursekit-max-h-[90%]`}
          src={
            content?.previewImage?.startsWith("http") ?? ""
              ? content?.previewImage
              : `../../../${content?.previewImage}`
          }
          alt="Preview"
        />
      </div>
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
    <div className="coursekit-sticky coursekit-top-0 coursekit-h-full sm:coursekit-block sm:coursekit-w-1/2 coursekit-pb-16 sm:coursekit-pb-0">
      <div className="coursekit-overflow-visible coursekit-relative coursekit-h-full coursekit-rounded-xl">
        {(() => {
          switch (content?.type) {
            case "image":
              return (
                <div className="coursekit-flex coursekit-h-full  coursekit-justify-center coursekit-items-center coursekit-p-4 coursekit-mb-20 ">
                  <img
                    className="coursekit-object-contain coursekit-max-h-full coursekit-rounded-xl"
                    src={
                      content.value.startsWith("http")
                        ? content.value
                        : `/${content.value}`
                    }
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
                    <div className=" coursekit-text-black dark:coursekit-text-white coursekit-px-4 coursekit-py-1">
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
