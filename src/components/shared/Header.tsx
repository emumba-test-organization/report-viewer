const Header = () => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-sm font-medium text-gray-600">
          Doe, Jane A. [ID: JANEDOE]
        </h1>
        <p className="text-xs text-gray-500">
          Report generated on Thursday, July 25, 2024
        </p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold">uMETHOD</span>
      </div>
    </div>
  );
};
export default Header;
