import { FormInterface } from "../Services/formInterface";

export function Form({ onSubmit, children }: Readonly<FormInterface>) {
  return <form onSubmit={onSubmit}> {children} </form>;
}
