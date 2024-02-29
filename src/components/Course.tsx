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
  id?: number;
  lessons: Section[];
  canExit?: boolean;
  menuHoverColor?: string;
  menuSelectedColor?: string;
};

const Course: React.FC<CourseProps> = ({
  id = 0,
  lessons,
  canExit = false,
  menuHoverColor = undefined,
  menuSelectedColor = undefined,
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

  return (
    <div className="flex h-full w-full relative">
      <div
        className={`w-[350px] border-r dark:border-r-neutral-700 overflow-y-auto transition-opacity ${
          menuOpen ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <div className="side-menu-content">
          <div className="py-4 pr-4 pl-2 sticky top-0 border-b dark:border-b-neutral-700 backdrop-blur">
            <div className="flex justify-between">
              <button onClick={() => setMenuOpen(false)} className="btn-ghost">
                <PanelLeftClose size={24} />
              </button>
              {canExit && (
                <a href="/courses" className="btn-ghost">
                  <div className="text-red-400">Exit Course</div>
                </a>
              )}
            </div>
          </div>
          <ul className="py-4 px-4">
            {lessons.map((section, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setIndex(index);
                    document.cookie = `current-position-for-${id}=${section.id}`;
                  }}
                  ref={index === currentIndex ? listItemRef : undefined}
                  className={`block w-full p-2 text-left ${
                    menuHoverColor != null
                      ? menuHoverColor
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }  ${
                    index === currentIndex
                      ? `${
                          menuSelectedColor != null
                            ? menuSelectedColor
                            : "bg-neutral-200 dark:bg-neutral-700"
                        } rounded`
                      : ""
                  } ${
                    cookieArray?.includes(section.id.toString())
                      ? "dark:text-green-300 text-green-600"
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
        className="relative transition-opacity w-full overflow-y-auto"
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

export { Course };

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
    item.classList.add("scale-75");
    setTimeout(() => {
      item.classList.remove("scale-75");
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
    <div
      className={`fixed z-50 bottom-2 left-2 p-4 ${menuOpen ? `pl-72` : ``}`}
    >
      <div
        className={`flex h-full items-center justify-center space-x-4 rounded`}
      >
        {!menuOpen && (
          <button
            data-tooltip-target="tooltip-menu"
            type="button"
            className="btn-default"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="btn-icon">
              <PanelLeftOpen size={28} />
            </div>
            <span className="sr-only">Menu</span>
          </button>
        )}
        <button
          data-tooltip-target="tooltip-complete"
          type="button"
          className="btn-default"
          onClick={onClickComplete}
        >
          <div ref={completeRef} className="btn-icon">
            <CheckIcon size={28} />
          </div>
          <span className="sr-only">Complete</span>
        </button>
        <div
          id="tooltip-complete"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-neutral-700"
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
              <div className="btn-icon">
                <Smartphone size={28} />
              </div>
              <span className="sr-only">Preview</span>
            </button>
            <div
              id="tooltip-preview"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-neutral-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-neutral-700"
            >
              Preview
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
