'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

const DEFAULT_ITEMS = Array.from({ length: 15 }, (_, i) => {
  const ids = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164];
  return {
    image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`,
    title: `Tile ${i + 1}`,
    href: undefined
  };
});

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = e => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { rootMargin: '120px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const columnItems = useMemo(() => {
    const cols = [];
    for (let c = 0; c < columns; c++) {
      const col = [];
      for (let i = 0; i < items.length; i++) {
        if (i % columns === c) col.push({ ...items[i], id: `${c}-${i}` });
      }
      cols.push(col);
    }
    return cols;
  }, [items, columns]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    setContainerHeight(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);

  const tileStep = tileHeight + gap;

  useEffect(() => {
    offsetsRef.current = columnItems.map((col, c) => {
      const factor = columnFactor(c, variance);
      const totalHeight = col.length * tileStep;
      return (c / Math.max(columns - 1, 1)) * totalHeight * 0.5;
    });
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnItems, columns, tileStep, variance]);

  const animate = useCallback(
    ts => {
      if (reduced) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1);
      lastTsRef.current = ts;

      const px = pointerRef.current;
      const pd = pointerDampedRef.current;
      pd.x += (px.x - pd.x) * Math.min(dt * 4, 1);
      pd.y += (px.y - pd.y) * Math.min(dt * 4, 1);

      if (planeRef.current && parallax > 0) {
        const rx = pd.y * tilt * parallax;
        const ry = pd.x * -turn * parallax * 0.5;
        planeRef.current.style.transform = `perspective(${perspective}px) rotateX(${tilt + rx}deg) rotateY(${turn + ry}deg) rotateZ(${roll}deg) translateZ(-${depth}px)`;
      }

      const wallPaused = pauseOnHover && wallHoveredRef.current;

      columnItems.forEach((col, c) => {
        const factor = columnFactor(c, variance);
        const colSpeed = speed * factor * (direction === 'up' ? 1 : -1);
        if (!wallPaused) {
          offsetsRef.current[c] = (offsetsRef.current[c] ?? 0) + colSpeed * dt;
        }
        const totalHeight = col.length * tileStep;
        offsetsRef.current[c] = ((offsetsRef.current[c] ?? 0) % totalHeight + totalHeight) % totalHeight;

        const track = trackRefs.current[c];
        if (track) {
          track.style.transform = `translateY(${-(offsetsRef.current[c] ?? 0)}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    },
    [reduced, parallax, tilt, turn, roll, perspective, depth, pauseOnHover, columnItems, speed, direction, variance, tileStep]
  );

  useEffect(() => {
    if (reduced || !isVisible) return;
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, reduced, isVisible]);

  const handlePointerMove = useCallback(e => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = { x: 0, y: 0 };
    wallHoveredRef.current = false;
  }, []);

  const handlePointerEnter = useCallback(() => {
    wallHoveredRef.current = true;
  }, []);

  const totalColumnWidth = columns * tileWidth + (columns - 1) * gap;

  const dimVal = dim;
  const grayVal = grayscale ? 1 : 0;

  return (
    <div
      ref={containerRef}
      className={`drift-wall ${className}`}
      style={{
        '--dw-fade': fade,
        '--dw-overlay': overlayColor,
        ...style
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      <div
        ref={planeRef}
        className="drift-wall__plane"
        style={{
          transform: `perspective(${perspective}px) rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(-${depth}px)`,
          width: totalColumnWidth,
          left: '50%',
          marginLeft: -totalColumnWidth / 2
        }}
      >
        {columnItems.map((col, c) => {
          const totalHeight = col.length * tileStep;
          const repeatCount = Math.ceil((containerHeight * 3) / totalHeight) + 2;
          const repeated = Array.from({ length: repeatCount }, (_, r) =>
            col.map(item => ({ ...item, repeatKey: `${item.id}-${r}` }))
          ).flat();

          return (
            <div
              key={c}
              className="drift-wall__column"
              style={{ width: tileWidth, gap }}
              onPointerEnter={() => { hoveredColRef.current = c; }}
              onPointerLeave={() => { hoveredColRef.current = -1; }}
            >
              <div
                ref={el => { trackRefs.current[c] = el; }}
                className="drift-wall__track"
                style={{ gap }}
              >
                {repeated.map(item => {
                  const isActive = activeId === item.repeatKey;
                  return (
                    <div
                      key={item.repeatKey}
                      className="drift-wall__tile"
                      style={{
                        width: tileWidth,
                        height: tileHeight,
                        borderRadius: radius,
                        '--dw-dim': dimVal,
                        '--dw-gray': grayVal,
                        '--dw-lift': `${lift}px`
                      }}
                      onPointerEnter={() => {
                        activeIdRef.current = item.repeatKey;
                        setActiveId(item.repeatKey);
                      }}
                      onPointerLeave={() => {
                        activeIdRef.current = null;
                        setActiveId(null);
                      }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="drift-wall__tile-inner"
                          tabIndex={0}
                          style={{ borderRadius: radius }}
                          draggable={false}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.title ?? ''} draggable={false} />
                          {item.title && (
                            <span className="drift-wall__label">{item.title}</span>
                          )}
                        </a>
                      ) : (
                        <div
                          className="drift-wall__tile-inner"
                          style={{ borderRadius: radius }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.title ?? ''} draggable={false} />
                          {item.title && (
                            <span className="drift-wall__label">{item.title}</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
