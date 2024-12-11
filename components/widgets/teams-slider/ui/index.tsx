"use client";

import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/shared/ui";

// Mock data for teams
const teams = [
  {
    id: 1,
    name: "Red Dragons",
    color: "#EF4444",
  },
  {
    id: 2,
    name: "Blue Sharks",
    color: "#3B82F6",
  },
  {
    id: 3,
    name: "Green Eagles",
    color: "#10B981",
  },
  {
    id: 4,
    name: "Purple Knights",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Yellow Lions",
    color: "#F59E0B",
  },
];

export function TeamsSlider() {
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({
      playOnInit: true,
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) {
        setIsAutoplayEnabled(!isAutoplayEnabled);
        if (isAutoplayEnabled) {
          autoplay.stop();
        } else {
          autoplay.play();
        }
      }
    }
  }, [emblaApi, isAutoplayEnabled]);

  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Teams:</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleAutoplay}
            className="h-8 w-8"
          >
            {isAutoplayEnabled ? "⏸️" : "▶️"}
            <span className="sr-only">
              {isAutoplayEnabled ? "Pause autoplay" : "Start autoplay"}
            </span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous team</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next team</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {teams.map((team) => (
            <div
              key={team.id}
              className="h-full flex-[0_0_100%] pl-4 min-[400px]:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
            >
              <Link href="/teams" className="block h-full">
                <Card className="group relative h-full overflow-hidden border-[1px] border-white/30 transition-all">
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-md"
                        style={{ backgroundColor: team.color }}
                      />
                      <h3 className="text-lg font-semibold">{team.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
