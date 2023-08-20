import { memo } from "react";

const SubData = ({ name, value }) => {
  return (
    <div>
      <span className="font-semibold">{name}</span>: <span>{value}</span>
    </div>
  )
}

export default memo(SubData)