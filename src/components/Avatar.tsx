interface AvatarProps {
  initials: string;
  className?: string;
}

const Avatar = ({ initials, className = "h-12 w-12" }: AvatarProps) => {
  return (
    <div className={`${className} rounded-full bg-primary-100 flex items-center justify-center`}>
      <span className="text-primary-600 font-medium">{initials}</span>
    </div>
  );
};

export { Avatar as default };