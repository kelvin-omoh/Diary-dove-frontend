import { useEffect } from "react";

const useResizeObserver = (ref, callback) => {
    useEffect(() => {
        if (!ref.current) return;

        const throttledCallback = throttle(callback, 100); // Throttle the callback function

        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                throttledCallback(entry);
            });
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, callback]);
};

// Throttle function to limit the rate of callback execution
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

export default useResizeObserver;
