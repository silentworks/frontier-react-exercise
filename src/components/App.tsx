import React, { FormEvent, ChangeEvent, useState } from 'react';
import formInstructions from '../data/form_instructions.json';
import { FormField } from './Fields';
import { HTMLField, Section, SectionContent } from './type';
import '../style.css'

function App() {
  // Check your console to see the full instructions!
  const [step, setStep] = useState({
    current: 1,
    total: formInstructions.sections.length
  })

  const [state, setState] = useState({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step.current !== step.total) {
      setStep(prevStep => ({ ...prevStep, current: prevStep.current + 1 }))
    }
    console.log({ state });
  }

  const onChange = (id: string) => (event: ChangeEvent<HTMLField>) => {
    const { value } = event.target;
    setState(prevState => ({ ...prevState, [id]: value }))
  }

  return (
    <div id="app">
      <header className="steps-header">
        <div className="steps" style={{ width: `calc(100%/${step.total}*${step.current})`}}>
          <span>Step {step.current} of {step.total}</span>
        </div>
      </header>

      {formInstructions.sections.map((section: Section, index) => {
        return (index + 1 === step.current) ? (
            <form className="section" key={section.id} onSubmit={handleSubmit} id={section.id}>
              <fieldset>
                <h2>{section.title}</h2>
                {section.content.map((content: SectionContent) =>
                  <FormField key={content.id} {...content} onChange={onChange(content.id)} />
                )}
              </fieldset>

              <button className="btn-action" type="submit">Next</button>
            </form>
          ) : null
      })}
    </div>
  );
}

export default App;
