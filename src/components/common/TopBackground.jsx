const TopBackground = ({path}) => {
  return (
    <div
      data-aos="fade-down"
      className="aspect-[375/240] lg:aspect-[192/65] w-[100vw] mx-[-16px] max-h-[650px] bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url('" + path + "')",
      }}
    />
  );
};

export default TopBackground;
