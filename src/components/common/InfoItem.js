const InfoItem = ({ title, children }) => {
  return (
    <div className="flex justify-between">
      <span className="whitespace-nowrap min-w-[100px]">{title}</span>
      <span className="overflow-auto">{children}</span>
    </div>
  );
};

export default InfoItem;
