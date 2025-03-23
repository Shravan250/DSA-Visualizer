"use client";

export default function BrokenComponent() {
  throw new Error("This is a test error!");
  return <div>Will never render</div>;
}
