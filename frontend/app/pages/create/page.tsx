import { InputRingCommponent } from "@/app/components";

export default function CreateScreen() {
  return (
    <div className="h-full w-full">
      <video
        className="absolute -z-50 h-full w-full object-cover"
        src="/ring-background.mp4"
        autoPlay
        loop
      />
      <InputRingCommponent />
    </div>
  );
}
