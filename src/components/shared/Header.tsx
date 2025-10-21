export type HeaderData = {
  reportFor: string;
  coverText: string;
  id?: string;
  name: string;
  createdOn: string;
  doctor: string;
  clinic: string;
  client: string;
};

const Header = ({ data }: { data?: HeaderData }) => {  
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <div className="">
          <span className="font-bold">{data?.name || ""}</span><span className="font-medium"> {data?.id ? `[ID: ${data.id}]` : null}</span>
        </div>
        <p className="text-sm font-light">
          Report generated on {data?.createdOn || ""}
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
