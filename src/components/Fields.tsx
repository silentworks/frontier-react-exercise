import React, { ChangeEvent } from 'react'
import { HTMLField, InputFieldProps, MetadataOption } from './type'

export function TextField({ id = '', type = 'text', required = false, ...rest }) {
  return <input id={id} type={type} name={id} required={required} {...rest} />
}

export function CheckboxField({ id = '', type = 'text', required = false, ...rest }) {
  return <input id={id} type="checkbox" name={id} required={required} {...rest} />
}

export function TextareaField({ id = '', type = 'text', required = false, ...rest }) {
  return <textarea id={id} required={required} {...rest}></textarea>
}

export function SelectField({ id = '', required = false, options = [], ...rest }) {
  const uniques = options.filter(
    (thing: MetadataOption, i, arr) => arr.findIndex((t: MetadataOption) => t.label === thing.label) === i
  );

  return (
    <select id={id} required={required} {...rest}>
      {uniques.map((option: { label: string; value: string; }) => (
        <option key={option.value.toLowerCase()} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

export function FieldFactory({ id = '', fieldType = 'text', type = 'text', onChange = (event: ChangeEvent<HTMLField>) => {}, ...rest }) {
  delete rest.format // remove the format prop since we are using it as type prop in this instance
  switch (fieldType) {
    case "boolean":
      return <CheckboxField id={id} type={type} onChange={onChange} {...rest} />
    case "monochoice":
      return <SelectField id={id} onChange={onChange} {...rest} />
    case "multichoice":
      return <SelectField id={id} onChange={onChange} multiple {...rest} />
    case "textarea":
      return <TextareaField id={id} onChange={onChange} {...rest} />
    case "number":
      return <TextField id={id} type="number" min={1} onChange={onChange} {...rest} />
    default:
      const maxLength = rest.maxlength
      delete rest.maxlength
      return <TextField id={id} type={type} maxLength={maxLength} onChange={onChange} {...rest} />
  }
}

export function FormField(props: InputFieldProps) {
  const { id, type, metadata, question_text, onChange } = props
  return (
    <div className="form-field">
      <label htmlFor={id}>{question_text}</label>
      <FieldFactory fieldType={type} id={id} type={metadata.format} {...metadata} onChange={onChange} />
    </div>
  )
}