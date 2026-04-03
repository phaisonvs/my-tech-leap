import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useEffect, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { autoplayMock, autoplayFactoryMock, fakeCarouselApi, resetAutoplayState } = vi.hoisted(() => {
  let playing = false;

  const autoplayMock = {
    stop: vi.fn(() => {
      playing = false;
    }),
    play: vi.fn(() => {
      playing = true;
    }),
    reset: vi.fn(),
    isPlaying: vi.fn(() => playing),
    timeUntilNext: vi.fn(),
  };

  const fakeCarouselApi = {
    selectedScrollSnap: vi.fn(() => 0),
    on: vi.fn(),
    off: vi.fn(),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
  };

  return {
    autoplayMock,
    autoplayFactoryMock: vi.fn(() => autoplayMock),
    fakeCarouselApi,
    resetAutoplayState: () => {
      playing = false;
    },
  };
});

vi.mock("embla-carousel-autoplay", () => ({
  default: autoplayFactoryMock,
}));

vi.mock("@/components/cases-utils", () => ({
  shuffleArray: (items: readonly unknown[]) => [...items],
  uniqueCases: (items: readonly unknown[]) => [...items],
}));

vi.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children, setApi }: { children: ReactNode; setApi?: (api: typeof fakeCarouselApi) => void }) => {
    useEffect(() => {
      setApi?.(fakeCarouselApi);
    }, [setApi]);

    return <div>{children}</div>;
  },
  CarouselContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/hooks/use-in-view", () => ({
  useInView: () => ({ ref: vi.fn(), isVisible: true }),
}));

import Cases from "./Cases";

describe("Cases", () => {
  beforeEach(() => {
    autoplayFactoryMock.mockClear();
    autoplayMock.stop.mockClear();
    autoplayMock.play.mockClear();
    autoplayMock.reset.mockClear();
    autoplayMock.isPlaying.mockClear();
    autoplayMock.timeUntilNext.mockClear();
    fakeCarouselApi.selectedScrollSnap.mockClear();
    fakeCarouselApi.on.mockClear();
    fakeCarouselApi.off.mockClear();
    fakeCarouselApi.scrollPrev.mockClear();
    fakeCarouselApi.scrollNext.mockClear();
    fakeCarouselApi.scrollTo.mockClear();
    resetAutoplayState();
  });

  it("pauses on hover and resumes when the mouse leaves the section", async () => {
    const { container } = render(<Cases />);
    const carouselWrapper = container.querySelector(".cases-carousel-mask");

    expect(carouselWrapper).toBeTruthy();
    expect(autoplayFactoryMock).toHaveBeenCalled();

    const options = autoplayFactoryMock.mock.calls[0]?.[0] as {
      delay: number;
      playOnInit: boolean;
      stopOnInteraction: boolean;
      stopOnMouseEnter: boolean;
      stopOnFocusIn: boolean;
    };

    expect(options.delay).toBe(1800);
    expect(options.playOnInit).toBe(false);
    expect(options.stopOnInteraction).toBe(true);
    expect(options.stopOnMouseEnter).toBe(false);
    expect(options.stopOnFocusIn).toBe(false);
    await waitFor(() => expect(autoplayMock.play).toHaveBeenCalledTimes(1));

    fireEvent.mouseEnter(carouselWrapper as Element);
    expect(autoplayMock.stop).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(carouselWrapper as Element);
    await waitFor(() => expect(autoplayMock.play).toHaveBeenCalledTimes(2));

    expect(autoplayMock.stop).toHaveBeenCalledTimes(1);
  });

  it("does not open the modal when the user drags a case card", () => {
    render(<Cases />);

    const card = screen.getByRole("button", { name: /Localpage/i });

    fireEvent.mouseDown(card, {
      button: 0,
      clientX: 10,
      clientY: 10,
    });
    fireEvent.mouseUp(card, {
      clientX: 40,
      clientY: 18,
    });
    fireEvent.click(card, {
      clientX: 40,
      clientY: 18,
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
