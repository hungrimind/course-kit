"use client";

import { Course, Section } from "course-kit";
import test from "./test.json";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <div className="w-screen h-screen">
        <Course id={0} lessons={test.lessons as Section[]} canExit={false} />
      </div>
    </main>
  );
}
