import { FormLoginLayout } from "@/src/components/form/login-form";

export default function Home() {
  return (
    <main
      className={`w-full  h-screen flex items-center justify-center gap-40 max-w-[1800px]`}
    >
      <section
        className={`w-[80%] h-[80%] flex items-center justify-between cards-shadow rounded-lg `}
      >
        <figure className="w-1/2 h-full hidden lg:flex flex-col  gap-4 justify-center  items-center bg-forest rounded-l-lg ">
          <h1 className={`text-center gold-text font-ring text-5xl `}>
            ring creator
          </h1>
          <span className={`text-center max-w-[400px] sofadi-font text-xl`}>
            Crie uma joia única que reflete o poder e a magia da Terra-média.
          </span>
        </figure>
        <section
          className={`w-full lg:w-1/2 flex flex-col justify-center gap-14 items-center`}
        >
          <article className={`w-2/3 lg:hidden flex flex-col items-center`}>
            <h1 className={`text-center gold-text font-ring text-5xl `}>
              ring creator
            </h1>
            <span className={`text-center max-w-[400px] sofadi-font text-xl`}>
              Crie uma joia única que reflete o poder e a magia da Terra-média.
            </span>
          </article>
          <section className={`w-2/3 md:w-1/2 flex flex-col gap-4`}>
            <FormLoginLayout />
          </section>
        </section>
      </section>
    </main>
  );
}
