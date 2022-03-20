import React from 'react';
import { useSelector } from 'react-redux';

export const Equipamentos = () => {
  const updateData = useSelector(state => state.updateState.data);
  console.log(updateData);
  return <h1>Equipamentos</h1>
}
