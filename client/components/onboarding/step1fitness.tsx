import Checkbox from "../forms/FormCheckbox";

type Step1Details = {
    note: string;
}

const Step1Fitness = ( props: Step1Details ) => {
  return (
    <div>
      <h1>{props.note}</h1>
      <div>
        <Checkbox label="Yes" />
        <Checkbox label="No" />
      </div>
    </div>
  )
}

export default Step1Fitness



