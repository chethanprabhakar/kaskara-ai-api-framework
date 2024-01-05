
type CheckboxDetails = {
  label: string;
}

const Checkbox = ( props: CheckboxDetails ) => {
  return (
    <span>
      {props.label}
      <input type="checkbox" width="25" />
    </span>
  )
}

export default Checkbox



