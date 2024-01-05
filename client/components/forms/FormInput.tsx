
type InputDetails = {
    label: string;
}

const Input = ( props: InputDetails ) => {
  return (
    <div>
      {props.label}
      <input type="text" />
    </div>
  )
}

export default Input



