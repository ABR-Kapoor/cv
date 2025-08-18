import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

export default OptimizedImage;

