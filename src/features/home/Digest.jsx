/* eslint-disable react/prop-types */
function Digest({ digest }) {
  return (
    <li className="flex justify-between items-center">
      <span>{digest.label}</span> <span>{Math.trunc(digest.total)} g </span>
    </li>
  );
}

export default Digest;
