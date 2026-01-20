type FileDropProps = {
  label: string;
  hint: string;
  accept: string;
};

function FileDrop({ label, hint, accept }: FileDropProps) {
  return (
    <label className="dropzone">
      <input type="file" accept={accept} />
      <div>
        <div className="dropzone-title">{label}</div>
        <p className="helper">{hint}</p>
      </div>
    </label>
  );
}

export default FileDrop;
