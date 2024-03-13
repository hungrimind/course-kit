import React, { useRef } from "react";
import HeaderSection from "./HeaderSection";
import SlideSection from "./SlideSection";

import {
  CheckIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Smartphone,
} from "lucide-react";

import MarkdownSection from "./MarkdownSection";

export interface SlideSectionProps {
  id: string;
  heading?: string | undefined;
  type: string;
  file?: string | undefined;
  value: string;
  highlight?: string | undefined;
  content: string;
  previewImage?: string | undefined;
  sectionType: "slide";
}

export interface MarkdownSectionProps {
  id: string;
  content: string;
  heading: string;
  sectionType: "md";
}

export interface HeaderSectionProps {
  id: string;
  headline: string;
  subheadline: string;
  sectionType: "header";
  content: string;
  links: Array<{ url: string; type: string }>;
  image: string;
}

export type Section =
  | SlideSectionProps
  | MarkdownSectionProps
  | HeaderSectionProps;

export type CourseProps = {
  id: number;
  lessons: Section[];
  canExit?: boolean;
  menuHoverColor?: string;
  menuSelectedColor?: string;
  onIndexChange?: (index: number) => void;
};

export const Course: React.FC<CourseProps> = ({
  id,
  lessons,
  canExit,
  menuHoverColor,
  menuSelectedColor,
  onIndexChange,
}) => {
  const [previewOpen, setPreviewOpen] = React.useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const listItemRef = useRef<HTMLButtonElement>(null);

  const divRef = React.useRef<HTMLDivElement>(null);

  const [cookieArray, setCookieArray] = React.useState<string[] | undefined>(
    undefined
  );

  //retrieve the index from cookies and set it to currentIndex
  React.useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.includes(`current-position-for-${id}`));
    if (cookie) {
      const currentLessonId = cookie.split("=")[1];
      // the current lessons don't contain ids within them, once they do this should work

      console.log(lessons.findIndex((l) => l.id == currentLessonId));

      setIndex(lessons.findIndex((l) => l.id == currentLessonId));
    }

    let cookieArray = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`progress-for-${id}`))
      ?.split("=")[1]
      .split(",");
    setCookieArray(cookieArray);
  }, [lessons]);

  const [currentIndex, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (menuOpen) {
      listItemRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [menuOpen, listItemRef, currentIndex]);

  React.useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="coursekit-bg-neutral-50 dark:coursekit-bg-neutral-950 coursekit-flex coursekit-h-full coursekit-w-full coursekit-relative">
      <div
        className={`coursekit-w-[350px] coursekit-border-r dark:coursekit-border-r-neutral-700 coursekit-overflow-y-auto coursekit-transition-opacity ${
          menuOpen
            ? "coursekit-opacity-100 coursekit-block"
            : "coursekit-opacity-0 coursekit-hidden"
        }`}
      >
        <div className="side-menu-content">
          <div className="coursekit-py-4 coursekit-pr-4 coursekit-pl-2 coursekit-sticky coursekit-top-0 coursekit-border-b dark:coursekit-border-b-neutral-700 coursekit-backdrop-blur">
            <div className="coursekit-flex coursekit-justify-between">
              <button onClick={() => setMenuOpen(false)} className="btn-ghost">
                <PanelLeftClose size={24} />
              </button>
              {canExit && (
                <a href="/courses" className="btn-ghost">
                  <div className="coursekit-text-red-400">Exit Course</div>
                </a>
              )}
            </div>
          </div>
          <ul className="coursekit-py-4 coursekit-px-4">
            {lessons.map((section, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setIndex(index);
                    document.cookie = `current-position-for-${id}=${section.id}`;
                  }}
                  ref={index === currentIndex ? listItemRef : undefined}
                  className={`coursekit-block coursekit-w-full coursekit-p-2 coursekit-text-left ${
                    menuHoverColor != null
                      ? menuHoverColor
                      : "hover:coursekit-bg-neutral-100 dark:hover:coursekit-bg-neutral-800"
                  }  ${
                    index === currentIndex
                      ? `${
                          menuSelectedColor != null
                            ? menuSelectedColor
                            : "coursekit-bg-neutral-200 dark:coursekit-bg-neutral-700"
                        } coursekit-rounded`
                      : ""
                  } ${
                    cookieArray?.includes(section.id.toString())
                      ? "dark:coursekit-text-green-300 coursekit-text-green-600"
                      : ""
                  }`}
                >
                  {(() => {
                    switch (section.sectionType) {
                      case "header":
                        return <span>Introduction</span>;
                      default:
                        return <span>{section.heading}</span>;
                    }
                  })()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="coursekit-relative coursekit-transition-opacity coursekit-w-full coursekit-overflow-y-auto"
        ref={divRef}
      >
        <BottomNavigation
          courseId={id}
          currentIndex={currentIndex}
          previewOpen={previewOpen}
          setIndex={setIndex}
          contentLength={lessons.length}
          setPreviewOpen={setPreviewOpen}
          content={lessons}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          cookieArray={cookieArray}
          setCookieArray={setCookieArray}
        />
        {(() => {
          switch (lessons[currentIndex].sectionType) {
            case "slide":
              return (
                <SlideSection
                  content={lessons[currentIndex] as SlideSectionProps}
                  previewOpen={previewOpen}
                  setPreviewOpen={setPreviewOpen}
                />
              );
            case "md":
              return (
                <MarkdownSection
                  {...(lessons[currentIndex] as MarkdownSectionProps)}
                />
              );
            case "header":
              return (
                <HeaderSection
                  {...(lessons[currentIndex] as HeaderSectionProps)}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default Course;

function BottomNavigation({
  courseId,
  currentIndex,
  previewOpen,
  contentLength,
  setIndex,
  setPreviewOpen,
  content,
  menuOpen,
  setMenuOpen,
  cookieArray,
  setCookieArray,
}: {
  courseId: number;
  currentIndex: number;
  previewOpen: boolean;
  contentLength: number;
  setIndex: (index: number) => void;
  setPreviewOpen: (isOpen: boolean) => void;
  content: Section[];
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  cookieArray: string[] | undefined;
  setCookieArray: (cookieArray: string[] | undefined) => void;
}) {
  const completeRef = React.useRef<HTMLDivElement>(null);
  const hasPreview =
    content[currentIndex] !== undefined &&
    "previewImage" in content[currentIndex];

  React.useEffect(() => {
    document.addEventListener("keydown", function (event) {
      const keyPressed = event.key.toLowerCase();
      if (
        keyPressed === "c" &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        !event.metaKey
      ) {
        completeKeymap();
      }
    });
  }, []);

  function completeKeymap() {
    const item = completeRef.current;
    if (!item) return;
    item.classList.add("coursekit-scale-75");
    setTimeout(() => {
      item.classList.remove("coursekit-scale-75");
    }, 100);
    completeRef.current?.click();
    completeRef.current?.focus();
  }

  function onClickComplete() {
    // update the cookie array of completed lessons with the current lesson
    // if the current lesson is not already in the array
    if (!cookieArray) {
      cookieArray = [];
    }

    if (!cookieArray.includes(content[currentIndex].id.toString())) {
      cookieArray.push(content[currentIndex].id.toString());
      setCookieArray(cookieArray);
    }

    document.cookie = `progress-for-${courseId}=${cookieArray}`;

    if (currentIndex === contentLength - 1) {
      return;
    }

    if (
      content[currentIndex + 1].sectionType !== "slide" ||
      (content[currentIndex + 1] as SlideSectionProps).previewImage ===
        undefined
    ) {
      setPreviewOpen(false);
    }
    setIndex(currentIndex + 1);
    // set the index in cookies as well
    console.log(content[currentIndex]);
    // the current lessons don't contain ids within them, once they do this should work
    document.cookie = `current-position-for-${courseId}=${
      content[currentIndex + 1].id
    }`;
  }

  return (
    <div className="coursekit-absolute coursekit-bottom-16 coursekit-left-8 coursekit-z-50">
      <div className="coursekit-fixed">
        <div className="coursekit-flex coursekit-h-full coursekit-items-center coursekit-justify-center coursekit-space-x-4 coursekit-rounded">
          {!menuOpen && (
            <button
              data-tooltip-target="tooltip-menu"
              type="button"
              className="btn-default"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="coursekit-w-full coursekit-h-full coursekit-flex coursekit-items-center coursekit-justify-center active:coursekit-scale-75 coursekit-transition-transform">
                <PanelLeftOpen size={28} />
              </div>
              <span className="coursekit-sr-only">Menu</span>
            </button>
          )}
          <button
            data-tooltip-target="tooltip-complete"
            type="button"
            className="btn-default"
            onClick={onClickComplete}
          >
            <div
              ref={completeRef}
              className="coursekit-w-full coursekit-h-full coursekit-flex coursekit-items-center coursekit-justify-center active:coursekit-scale-75 coursekit-transition-transform"
            >
              <CheckIcon size={28} />
            </div>
            <span className="coursekit-sr-only">Complete</span>
          </button>
          <div
            id="tooltip-complete"
            role="tooltip"
            className="coursekit-absolute coursekit-z-10 coursekit-invisible coursekit-inline-block coursekit-px-3 coursekit-py-2 coursekit-text-sm coursekit-font-medium coursekit-text-white coursekit-transition-opacity coursekit-duration-300 coursekit-bg-neutral-900 coursekit-rounded-lg coursekit-shadow-sm coursekit-opacity-0 tooltip dark:coursekit-bg-neutral-700"
          >
            Complete
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {hasPreview && (
            <>
              <button
                onClick={() => setPreviewOpen(!previewOpen)}
                data-tooltip-target="tooltip-preview"
                type="button"
                className="btn-default"
              >
                <div className="coursekit-w-full coursekit-h-full coursekit-flex coursekit-items-center coursekit-justify-center active:coursekit-scale-75 coursekit-transition-transform">
                  <Smartphone size={28} />
                </div>
                <span className="coursekit-sr-only">Preview</span>
              </button>
              <div
                id="tooltip-preview"
                role="tooltip"
                className="coursekit-absolute coursekit-z-10 coursekit-invisible coursekit-inline-block coursekit-px-3 coursekit-py-2 coursekit-text-sm coursekit-font-medium coursekit-text-white coursekit-transition-opacity coursekit-duration-300 coursekit-bg-neutral-900 coursekit-rounded-lg coursekit-shadow-sm coursekit-opacity-0 tooltip dark:coursekit-bg-neutral-700"
              >
                Preview
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
