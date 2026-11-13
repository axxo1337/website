import { useEffect, useRef } from "react";

export type EventHandler<E extends Event = Event> = (event: E) => void;

/**
 * `useEventListener` is a custom React hook that adds an event listener to a specified element.
 * It simplifies the process of handling events by managing the event listener and callback function.
 *
 * @param eventType - The type of event to listen for.
 * @param callback - The function to execute when the event occurs.
 * @param element - The element to add the event listener to. Default is the window.
 */
export function useEventListener<E extends Event = Event>(
  eventType: string,
  callback: EventHandler<E>,
  element: any = window,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement =
      element && "current" in element ? element.current : element;
    if (!targetElement) return;

    const handler = (e: E) => callbackRef.current(e);
    targetElement.addEventListener(eventType, handler as EventListener);

    return () =>
      targetElement.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
}
