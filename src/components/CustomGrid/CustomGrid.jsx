import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomGrid({
  numberOfColumns,
  gapBetweenColumns,
  children,
  gridItemStyle = {},
  gutter,
}) {
  const gridClass = `row row-cols-${numberOfColumns} gap-${gapBetweenColumns} g-${gutter} overflow-auto vh-100`;
  console.log(gridClass);
  return (
    <div className={gridClass}>
      {children &&
        children.map((child, index) => (
          <div className="col" style={gridItemStyle} key={index}>
            {child}
          </div>
        ))}
    </div>
  );
}

export default CustomGrid;
