import {useLatestRef} from "@hydrophobefireman/kit/hooks";
import {useEffect, useRef} from "@hydrophobefireman/ui-lib";

export const useDebouncedEffect: typeof useEffect = function (_cb, deps) {
  const latestCb = useLatestRef(_cb);
  const timerRef = useRef<any>();
  const cleanup = useRef<any>();
  useEffect(() => {
    const cb = latestCb.current;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      cleanup.current = cb();
    }, (cb as any).timeout || 500);
    return () => typeof cleanup.current === "function" && cleanup.current();
  }, deps);
};
