interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function Label({ children, className = "" }: LabelProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${className}`}>
      {children}
    </label>
  );
}