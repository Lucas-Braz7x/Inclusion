import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';



export const Home = () => {
  const [handleUpdate, setHandleUpdate] = useState(false);
  const dispatch = useDispatch();
  const update = () => {
    dispatch({ type: 'CLICK_UPDATE_VALUE', login: "Contexto", equipamentos: "Cadeira" });
    setHandleUpdate(!handleUpdate)
  }

  const updateData = useSelector(state => state.updateState.data);

  useEffect(() => {
    console.log(updateData);
  }, [handleUpdate])

  return (
    <button onClick={update}>Atualizar valores</button>

  )
}
