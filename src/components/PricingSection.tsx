import PricingCard from "./PricingCard";

const PricingSection: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center gap-8 mb-2">
      <div className="relative">
        <PricingCard
          value={value}
          title="Standard"
          price={value === "monthly" ? "99" : "2,999"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          features={[
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
          ]}
          buttonText="Choose Plan"
          buttonColor="#1d3752"
        />
      </div>
      <div className="relative">
        <PricingCard
          className="-mt-10"
          value={value}
          title="Premium"
          price={value === "monthly" ? "299" : "29,999"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          features={[
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
          ]}
          buttonText="Choose Plan"
          buttonColor="#ffa200"
          highlight={true}
        />
      </div>
      <div className="relative">
        <PricingCard
          value={value}
          title="Enterprise"
          price="Custom Plan"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          features={[
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
            "Lorem ipsum",
          ]}
          buttonText="Contact Us"
          buttonColor="#1d3752"
        />
      </div>
    </div>
  );
};

export default PricingSection;
