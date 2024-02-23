"use client";

import { Course, Section } from "course-kit";
import "course-kit/dist/index.css";
import test from "./test.json";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="w-screen h-screen">
        <Course lessons={test.lessons as Section[]} />
      </div>
    </main>
  );
}
