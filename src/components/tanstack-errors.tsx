import { ReactFormExtendedApi, useStore } from "@tanstack/react-form";

type Props<T> = {
  form: ReactFormExtendedApi<T, undefined>;
};

export function TanstackFormErrorList<T>({ form }: Props<T>) {
  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <ul className="list-disc list-inside">
      {formErrors.flatMap((flat) => {
        return (flat ?? "")
          .toString()
          .split(",")
          .map((error) => (
            <li key={error} className="error">
              {error}
            </li>
          ));
      })}
    </ul>
  );
}
