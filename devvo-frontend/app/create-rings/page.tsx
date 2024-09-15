import { RingFormLayout } from "@/src/components/form/ring-form";

export default function CreateRings() {
  return (
    <main
      className={`py-28 pt-16 xs:py-28 md:py-6 w-full min-h-screen flex flex-col items-center bg-battle justify-center gap-8`}
    >
      <h1 className={`text-center gold-text font-ring text-5xl `}>
        criação de anéis
      </h1>
      <section
        className={`w-10/12 rounded-xl bg-background/70 border-2 border-border p-6 lg:w-8/12 max-w-[690px]`}
      >
        <RingFormLayout />
      </section>
    </main>
  );
}
