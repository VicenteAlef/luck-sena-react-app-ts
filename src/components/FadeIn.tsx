import React, { type ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'none',
  delay = 0,
  duration = 700,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Para de observar após animar
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Mapeamento de direções para classes do Tailwind
  const translateClasses = {
    up: isVisible ? 'translate-y-0' : 'translate-y-10',
    down: isVisible ? 'translate-y-0' : '-translate-y-10',
    left: isVisible ? 'translate-x-0' : 'translate-x-10',
    right: isVisible ? 'translate-x-0' : '-translate-x-10',
    none: '',
  };

  return (
    <div
      ref={domRef}
      className={`
        transition-all ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${translateClasses[direction]}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
