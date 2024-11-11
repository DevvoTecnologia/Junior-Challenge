import { InputSignUpFormComponent } from "@/app/components";

export default function SignupScreen() {
  return (
    <div className="h-full w-full">
      <video
        className="absolute -z-10 h-full w-full object-cover"
        src="/signup-background.mp4"
        autoPlay
        loop
      />
      <InputSignUpFormComponent />
    </div>
  );
}
