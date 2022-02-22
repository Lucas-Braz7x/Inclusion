import React from 'react';
import * as P from 'prop-types';
import './styles.css';

export const Container = (props) => {
  return <div className='container'>{props.children}</div>
}

/*
Tipagem do eslint, serve para devir o que o elemento tá
recebendo com "props", neste caso ele especifica que é um elemento
*/

Container.propTypes = {
  children: P.element
}
