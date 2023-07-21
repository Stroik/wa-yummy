export const Loading = ({ full = false }) => {
  return (
    <div className={`grid place-content-center ${full ? "h-[calc(100vh-20rem)] overflow-hidden": ""}`}>
      <i className="ri-loader-4-line animate-spin text-6xl"></i>
    </div>
  );
};
