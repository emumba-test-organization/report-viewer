const Footer = () => {
  return (
    <div className="flex justify-between w-full mt-auto py-4">
      <div className="flex flex-col items-start text-sm">
        <p className="text-link">www.uMETHOD.com</p>
        <a href="mailto:support@umethod.com" className="underline text-link">support@umethod.com</a>
      </div>
      <div className="flex flex-col items-end text-sm font-normal">
        <p className="">Copyright © 2013–2025 uMETHOD Health, Inc.</p>
        <p className="">All Rights Reserved. Confidential.</p>
      </div>
    </div>
  );
};

export default Footer;
