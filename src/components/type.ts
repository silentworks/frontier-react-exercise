import { ChangeEvent } from "react";

export type HTMLField = HTMLInputElement | HTMLSelectElement | HTMLOptionElement | HTMLTextAreaElement

export type InputFieldProps = SectionContent & { onChange: (event: ChangeEvent<HTMLField>) => void }

export interface MetadataOption {
  label: string;
  value: string;
}

export interface SectionContentMetadata {
  required: boolean;
  format?: string;
  pattern?: string;
  maxlength?: number;
  placeholder?: string;
  options?: MetadataOption[]
}

export interface SectionContent {
  id: string;
  type: string;
  output?: { originStep: number }[];
  metadata: SectionContentMetadata;
  question_text: string;
}

export interface Section {
  id: string;
  title: string;
  content: SectionContent[]
}

export interface Form {
  theme: {
    primary_color: string;
    secondary_color: string;
    background_color: string;
  };
  sections: Section[]
}