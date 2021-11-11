import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import CreatePost from '../CreatePost/CreatePost';
import { Container } from 'react-bootstrap';

function CustomGrid({
  children,
  gridItemStyle = {},
  className: additionalClasses,
}) {
  return (
    <div className={additionalClasses}>
      <Container fluid className={'flex-shrink-0 w-100'}>
        <CreatePost />
      </Container>
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
