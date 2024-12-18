
const SubmitBtn = ({
  loading,
  btnText = "Submit",
}: {
  loading: boolean;
  btnText?: string;
}) => {
  return (
    <button
      type="submit"
      className="btn btn-primary"
      style={{ opacity: loading ? 0.5 : 1 }}
      disabled={loading}
    >
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        btnText
      )}
    </button>
  );
};

export default SubmitBtn;
