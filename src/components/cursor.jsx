import { useEffect } from 'react';

const CustomCursor = () => {
    useEffect(() => {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        };

        const onMouseEnter = () => {
            if (cursorDot) cursorDot.style.opacity = 1;
            if (cursorOutline) cursorOutline.style.opacity = 1;
        };

        const onMouseLeave = () => {
            if (cursorDot) cursorDot.style.opacity = 0;
            if (cursorOutline) cursorOutline.style.opacity = 0;
        };

        const animate = () => {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        animate();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <>
            <style>{`
        body {
          cursor: none;
        }
        .cursor-dot,
        .cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.15s ease-out;
        }
        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.1s ease-out;
        }
        .cursor-outline {
          width: 30px;
          height: 30px;
          border: 2px solid white;
          border-radius: 50%;
          transition: transform 0.1s ease-out;
        }
      `}</style>

            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>
        </>
    );
};

export default CustomCursor;
