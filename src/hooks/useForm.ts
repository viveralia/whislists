import { ChangeEvent, FormEvent, useState } from "react";

function useForm<S>(
  initialValues: S,
  onSubmit: (values: S) => void | Promise<void>
) {
  const [values, setValues] = useState<S>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (files) {
      return setValues((values) => ({ ...values, [name]: files[0] }));
    }

    setValues((values) => ({ ...values, [name]: value }));
  }

  function updateFormValue(name: string, value: unknown) {
    setValues((values) => ({ ...values, name: value }));
  }

  function resetForm() {
    setValues(initialValues);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    updateFormValue,
    resetForm,
    updateFormValues: setValues,
  };
}

export default useForm;
