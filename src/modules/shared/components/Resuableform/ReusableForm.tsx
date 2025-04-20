import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface ReusableFormProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
}

const ReusableForm = ({ onSubmit, children }: ReusableFormProps) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {children}
    </form>
  );
};

export default ReusableForm;
