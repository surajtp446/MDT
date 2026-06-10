const ITEMS = [
  'Paddy Drying',
  'Parboiling Units',
  'Grain Silos',
  'Belt Conveyors',
  'Chain Elevators',
  'Custom Plants',
];

export default function ValueStrip() {
  return (
    <section className="bg-brand-mist border-y border-brand-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-7">
              {i !== 0 && (
                <span className="w-1 h-1 rounded-full bg-brand-gold/60" aria-hidden="true" />
              )}
              <span className="text-brand-muted text-xs sm:text-sm font-medium tracking-[0.18em] uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
