import { Course, type Section } from "course-kit";
import "course-kit/dist/index.css";
import test from "../test.json";

const lessons = test.lessons as Section[];

export default function StupidCourse(props: { lessons: Section[] }) {
  return <Course id={0} lessons={props.lessons} canExit={false} />;
}
