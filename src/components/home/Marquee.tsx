const WORDS = [
  "Subscription",
  "Sharing",
  "Rental",
  "Renewal",
  "Trade",
] as const;

/** Slim divider marquee between the hero and the first section. */
export default function Marquee() {
  const track = (
    <>
      {WORDS.map((w) => (
        <span key={w} className="flex shrink-0 items-center">
          <span className="font-serif text-[22px] italic leading-none text-primary/55 md:text-[26px]">
            {w}
          </span>
          <span aria-hidden className="mx-10 block h-1 w-1 rotate-45 bg-gold/70 md:mx-14" />
        </span>
      ))}
    </>
  );

  return (
    <div aria-hidden className="overflow-hidden border-b border-line bg-paper py-6">
      <div className="marquee-track">
        {track}
        {track}
      </div>
    </div>
  );
}
