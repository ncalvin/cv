import React, { useState } from 'react';

interface AvatarLogoProps {
  size?: number;
  disableHover?: boolean;
}

const AvatarLogo: React.FC<AvatarLogoProps> = ({ size = 40, disableHover = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!disableHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disableHover) setIsHovered(false);
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        cursor: disableHover ? 'default' : 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered
          ? '0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 3px var(--color-primary)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Avatar de Newton Calvin"
    >
      <img
        src="https://media.licdn.com/dms/image/v2/C4D03AQEO-QeYwOZLSA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1643052547532?e=1765411200&v=beta&t=Aem6f08IebwhdtQhny88Qhc3CxYXGDI3NX_8yoQJFkU"
        alt="Newton Calvin - Tech Lead & Fintech Specialist"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'filter 0.3s ease, transform 0.3s ease',
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        loading="lazy"
      />
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(132, 170, 252, 0.2) 0%, rgba(132, 170, 252, 0.1) 100%)',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
};

export default AvatarLogo;

