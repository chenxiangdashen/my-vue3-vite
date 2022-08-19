import { FormRules } from "naive-ui";

export declare interface IFormProps {
  name: string;
  label: string;
  placeholder: string;
  value: any;
  rules?: FormRules;
}

export interface IFormState {
  [key: string]: any;
}
