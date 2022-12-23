import { useCallback, useRef, useState } from "react";


// Hook
const useLongPress = (onLongPress, onClick, { shouldPreventDefault = false, delay = 500 } = {}) => {
    // console.info("useLongPress");

    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef();
    const target = useRef();

    //
    // Start the long press if 'onMouseDown' or 'onTouchStart'
    const start = useCallback(
        (event) => {
            // Create listener
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener("touchend", preventDefault, { passive: false });
                target.current = event.target;
            }

            // A long press event has been triggered
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    //
    // Clear the long press if 'onMouseUp', 'onMouseLeave' or 'onTouchEnd'
    const clear = useCallback(
        (event, shouldTriggerClick = true) => {

            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick(event);
            setLongPressTriggered(false);

            // Remove listener
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e) => start(e),
        onTouchStart: (e) => start(e),
        onMouseUp: (e) => clear(e),
        onMouseLeave: (e) => clear(e, false),
        onTouchEnd: (e) => clear(e, false), // Do not trigger click here
        onTouchMove: (e) => clear(e, false), // Do not trigger click here
    };
};

//
// Check if it is a touch event - called by 'preventDefault'
const isTouchEvent = (event) => {
    return "touches" in event;
};

//
//
const preventDefault = (event) => {

    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        if (event.cancelable) event.preventDefault();
    }
};

export default useLongPress;