import clsx from "clsx";

interface HeadingProps {
  className?: string;
  title: string;
  description?: string;
}

const Heading: React.FC<HeadingProps> = ({ className, title, description }) => {
  return (
    <div>
      <h2 className={clsx(`text-2xl font-bold tracking-tight`, className)}>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
