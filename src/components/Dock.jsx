import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  // GSAP hover/fisheye effect
  useGSAP(
    () => {
      const dock = dockRef.current;
      if (!dock) return;

      const icons = dock.querySelectorAll(".dock-icon");

      const animateIcons = (mouseX) => {
        const { left } = dock.getBoundingClientRect();

        icons.forEach((icon) => {
          const { left: iconLeft, width } = icon.getBoundingClientRect();
          const center = iconLeft - left + width / 2;
          const distance = Math.abs(mouseX - center);

          // intensity curve (tweakable)
          const intensity = Math.exp(-(distance ** 2.5) / 20000);

          // use killTweensOf to avoid piling tweens on the same element
          gsap.killTweensOf(icon);
          gsap.to(icon, {
            scale: 1 + 0.25 * intensity,
            y: -15 * intensity,
            duration: 0.2,
            ease: "power1.out",
          });
        });
      };

      const handleMouseMove = (e) => {
        // send absolute clientX to animateIcons
        animateIcons(e.clientX);
      };

      const resetIcons = () =>
        icons.forEach((icon) => {
          gsap.killTweensOf(icon);
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          });
        });

      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", resetIcons);

      // cleanup
      return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", resetIcons);
        // ensure no lingering tweens
        icons.forEach((icon) => gsap.killTweensOf(icon));
      };
    },
    // dependencies: none (only run once)
    []
  );

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    // avoid shadowing global "window", use win
    const win = windows[app.id];
    if (!win) {
      // If no window state exists we open a new one
      openWindow(app.id);
      return;
    }

    if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  // keyboard-friendly activation for icons
  const handleKeyDown = (e, app) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleApp(app);
    }
  };

  return (
    <section id="dock" aria-label="Application Dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const win = windows[id];
          const isPressed = !!(win && win.isOpen);

          return (
            <div key={id} className="relative flex justify-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                aria-pressed={isPressed}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
                onKeyDown={(e) => handleKeyDown(e, { id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
