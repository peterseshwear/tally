import Image from 'next/image';

import { WorldMap } from '@/components/ui/world-map';

export interface ZippayWorldMapSectionProps {
  id?: string;
  tagline?: string;
  title?: string;
  description?: string;
}

const DEFAULT_DOTS = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: 'San Francisco' },
    end: { lat: 51.5072, lng: -0.1276, label: 'London' },
  },
  {
    start: { lat: 40.7128, lng: -74.006, label: 'New York' },
    end: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
  },
  {
    start: { lat: 51.5072, lng: -0.1276, label: 'London' },
    end: { lat: 25.2048, lng: 55.2708, label: 'Dubai' },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
    end: { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
  },
];

export default function ZippayWorldMapSection({
  id = 'zippay-world-map',
  tagline = 'Global Reach',
  title = 'Send and Receive Payments Anywhere',
  description = 'Zippay moves money across borders in seconds, backed by a network built for the way modern businesses work — wherever your team and customers are.',
}: ZippayWorldMapSectionProps) {
  return (
    <section id={id} className="bg-background px-6">
      <div className="container py-10 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <span className="text-body-xs-medium bg-gray-0 inline-flex h-8 items-center gap-2 rounded-[10px] border border-gray-100 px-3 py-0 leading-none shadow-[0_1px_2px_0_rgba(13,13,18,0.06)]">
            <Image
              src="/images/homepage/features/elipse.svg"
              alt="elipse"
              width={6}
              height={6}
              className="h-[6px] w-[6px]"
            />
            {tagline}
          </span>

          <h2 className="text-foreground text-heading-1 mt-4 max-w-[616px] tracking-tight lg:text-[52px]">
            {title}
          </h2>

          <p className="text-body-md sm:text-body-lg mx-auto mt-4 max-w-3xl text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <WorldMap dots={DEFAULT_DOTS} />
        </div>
      </div>
    </section>
  );
}
