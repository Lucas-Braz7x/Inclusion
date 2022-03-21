import React from 'react';
import './styles.scss';
import * as P from 'prop-types';

export const Button = ({ children, type }) => <button className='button' type={type}>{children}</button>

Button.propTypes = {
  children: P.string,
  type: P.string
}
