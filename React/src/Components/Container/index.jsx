import React from 'react';
import * as P from 'prop-types';
import './styles.scss';

export const Container = (props) => {
  return <div className='container-wrapper'>{props.children}</div>
}

Container.propTypes = {
  children: P.element
}
