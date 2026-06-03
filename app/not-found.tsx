import Link from "next/link";
import CallButton from "@/components/ui/CallButton";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-narrow text-center">
        <p className="eyebrow">Грешка 404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Страницата не е намерена</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ink-700">
          Възможно е страницата да е преместена или да не съществува. Върнете се към началото или се
          свържете с нас.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CallButton />
          <Link href="/" className="btn btn-outline">
            Към началото
          </Link>
        </div>
      </div>
    </section>
  );
}
