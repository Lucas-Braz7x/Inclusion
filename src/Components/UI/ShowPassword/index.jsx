import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

/*eslint-disable*/
export const ShowPassword = ({ idInput }) => {
  const [type, setType] = useState('')
  useEffect(() => {
    setType(document.getElementById(idInput).type);
  })
  const handleTypeInput = () => {
    const inputSenhaType = document.getElementById(idInput);
    inputSenhaType.type = type == 'password' ? 'text' : 'password';
    setType(type == 'password' ? 'text' : 'password');
  }

  return (
    <span>
      {type == "password" ? <AiFillEye onClick={handleTypeInput} /> :
        <AiFillEyeInvisible onClick={handleTypeInput} />}
    </span>
  )
}
