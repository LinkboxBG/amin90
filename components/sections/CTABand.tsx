import CallButton from "@/components/ui/CallButton";

export function CTABand({ title, text }: { title: string; text?: string }) {
  return (
    <section className="ds bg-navy-800">
      <div className="container-page flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
          {text && <p className="mt-3 text-on-dark-muted">{text}</p>}
        </div>
        <CallButton className="shrink-0" />
      </div>
    </section>
  );
}

export default CTABand;
