const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = "",
  style = {},
  multifile = false,
  multiline = false,
  required = true,
}) => {
  return (
    <div className="form-row" style={style}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {multiline ? (
        <textarea
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue}
          required={required}
        />
      ) : (
        <input
          type={type}
          multiple={multifile}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue}
          required={required}
        />
      )}
    </div>
  );
};

export default FormRow;
