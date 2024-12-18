const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-lg">
      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-white/20 mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-center font-heading">{title}</h3>
      <p className="mt-2 text-sm text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
