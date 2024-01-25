const Button = ({ text, deletePerson }) => {
  return (
    <button onClick={()=>{deletePerson()}}>{text}</button>
  )
}

export default Button