import { ChangeEvent, useState } from "react";

export default function useInput<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    setValue(event.target.value as T);
  }

  return [value, setValue, handleChange] as const;
}
