import React, { useEffect, useState } from 'react';

const useHeight = (ref: React.RefObject<HTMLDivElement>, offset?: number): number => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = ref?.current?.clientHeight;
    height && setHeight(height - (offset ?? 0));
  });

  return height;
};

export default useHeight;
