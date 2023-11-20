/* eslint-disable react/prop-types */
function Input({ register, defaultValue, name }) {
  return (
    <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor={name} className="sm:basis-40">
        <div className=" flex justify-between text-left capitalize">{name} <span>:</span></div>
      </label>
      <input
        {...register(name, { required: true })}
        defaultValue={defaultValue}
        className="input grow"
        type={name}
        name={name}
        id={name}
      />
    </div>
  );
}

export default Input;
