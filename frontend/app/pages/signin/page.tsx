import React from "react";
import { InputFormComponent } from "@/app/components";

export default function SigninScreen() {
  return (
    <div className="h-full w-full">
      <video
        className="absolute -z-10 h-full w-full object-cover"
        src="/background-video.mp4"
        autoPlay
        loop
      />
      <InputFormComponent />
    </div>
  );
}
