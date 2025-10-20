export type HeaderData = {
  id?: string;
  name: string;
  createdOn: string;
  doctor: string;
  clinic: string;
  client: string;
};

const Header = ({ data }: { data: HeaderData }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-sm">
          <span className="font-bold">{data.name}</span><span className="font-medium"> {data?.id ? `[ID: ${data.id}]` : null}</span>
        </h1>
        <p className="text-xs font-light">
          Report generated on {data.createdOn}
        </p>
      </div>
      <div>
        <img
          src="/logo.png"
          alt="uMethod Logo"
          className="w-auto h-[40px]"
        />
      </div>
    </div>
  );
};
export default Header;
