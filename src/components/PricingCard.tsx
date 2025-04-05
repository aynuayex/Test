import clsx from "clsx";
import React from "react";

type PricingCardProps = {
  value: string;
  className?: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  highlight?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  className,
  value,
  title,
  price,
  description,
  features,
  buttonText,
  buttonColor,
  highlight = false,
}) => {
  return (
    <div
      className={clsx(
        `p-6 rounded-lg shadow-xl border border-white/20 backdrop-blur-md ${
          highlight ? "bg-white/10 border-yellow-500/40" : "bg-white/10"
        } text-white text-center max-w-sm w-full`,
        className
      )}
    >
      <h3 className="text-xl font-bold mb-2">
        {title}
        {highlight && (
          <span className="text-xs font-semibold px-2 py-1 rounded">
            (Recommended)
          </span>
        )}
      </h3>
      <p className="text-sm mb-4">{description}</p>

      {title === "Enterprise" ? (
        <div className="relative text-4xl font-extrabold mb-4">{price}</div>
      ) : (
        <div className="relative text-4xl font-extrabold mb-4">
          ${price}
          <div className="absolute top-3 right-2 text-sm font-normal text-white/90">
            {" "}
            {value === "monthly" ? " /Per Month" : " /Per Year"}
          </div>
        </div>
      )}
      <hr />
      <ul className="space-y-2 mb-6 text-sm text-white/90 mt-2">
        {features.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-md bg-[${buttonColor}] font-semibold hover:opacity-70 transition`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
