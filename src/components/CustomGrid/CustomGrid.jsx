import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function CustomGrid({
  children,
  gridItemStyle = {},
  className: additionalClasses,
}) {
  console.log(additionalClasses);
  return (
    <div className={additionalClasses}>
      {children &&
        children.map((child, index) => (
          <div className="col" style={gridItemStyle} key={index}>
            {child}
          </div>
        ))}
    </div>
  );
}
CustomGrid.propTypes = {
  children: PropTypes.array.isRequired,
  gridItemStyle: PropTypes.object,
  className: PropTypes.string,
};
export default CustomGrid;
