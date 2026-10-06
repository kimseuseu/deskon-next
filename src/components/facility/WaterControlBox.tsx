import Image from "next/image";
import { controlBox } from "@/data/facility";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * 호스 기름기 · 막힘 컨트롤 박스. 필름이 잠깐 멈추고 읽는 자리입니다.
 * 사진과 기능 셋이 나란히 지나갑니다.
 */
export function WaterControlBox() {
  return (
    <section className="border-t border-line bg-surface/60">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-32">
        <div className="lg:col-span-6">
          <Reveal direction="none" duration={1.1} amount={0.2}>
            <figure>
              <div className="img-zoom relative aspect-[2/1] overflow-hidden bg-surface">
                <Image
                  src={controlBox.image}
                  alt={controlBox.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-[12px] text-muted">
                <span>{controlBox.productName}</span>
                <span className="font-serif italic">{controlBox.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <h2 className="font-paperlogy text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.2] tracking-[-0.02em] text-primary">
              {controlBox.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.9] text-muted">{controlBox.lead}</p>
          </Reveal>
          <Stagger className="mt-10 border-t border-primary/20" gap={0.1}>
            {controlBox.features.map((f) => (
              <StaggerItem key={f.title} className="border-b border-line py-6">
                <h3 className="font-paperlogy text-lg font-medium text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-[1.85] text-muted">{f.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
