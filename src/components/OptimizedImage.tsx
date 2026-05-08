import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, style }) => (
  <img src={src} alt={alt} className={className} style={style} loading="lazy" />
);

export default OptimizedImage;

