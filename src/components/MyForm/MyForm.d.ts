import { FormRules } from "naive-ui"

export interface IFormProps {
  name: string
  label: string
  placeholder: string
  value: string
  type: "MyInput" | "MySelect" | "date" | "time" | "dateTime" | "textarea"
  rules?: FormRules
  options?: Array<{}>
}

export interface IFormState {
  [key: string]: any
}
