function InputChat() {
  const handleKeyDown = (e) => {
    console.log('Mensaje enviado:', e.target.value);
    console.log('tecla usada: '+ e.key);
    if (e.key === 'Enter') {
      alert("tecla presionada: "+ e.key);
    }
  };

  return (
    <input 
      type="text" 
      placeholder="Escribe un mensaje y presiona Enter..." 
      onKeyDown={handleKeyDown} 
    />
  );
}

export default InputChat;