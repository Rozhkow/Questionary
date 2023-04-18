import React from 'react';
import { 
  TextField, 
  FormControl, 
  FormControlLabel, 
  Radio,
  RadioGroup,
  Checkbox
} from '@material-ui/core';

const TextQuestion = ({ question, answer, onAnswerChange }) => {
  const handleInputChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className="text-question">
      <h2>{question}</h2>
      <TextField value={answer || ''} onChange={handleInputChange} />
    </div>
  );
};

const RadioQuestion = ({ question, selectedAnswer, answers, onAnswerChange }) => {
  const handleRadioChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className="radio-question">
      <h2>{question}</h2>
      <FormControl component="fieldset">
        <RadioGroup 
          aria-label={question} 
          name={question} 
          value={selectedAnswer || ''} 
          onChange={handleRadioChange}
        >
          {answers.map((answer) => (
            <FormControlLabel 
              key={answer} 
              value={answer} 
              control={<Radio />} 
              label={answer} 
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const LongTextQuestion = ({ question, answer, onAnswerChange }) => {
  const handleInputChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div className="longtext-question">
      <h2>{question}</h2>
      <TextField
        value={answer || ''}
        onChange={handleInputChange}
        multiline
        rows={4}
      />
    </div>
  );
};

const CheckboxQuestion = ({ question, options, selectedOptions, onOptionChange }) => {
  const handleCheckboxChange = (event) => {
    const optionIndex = parseInt(event.target.value);

    const newSelectedOptions = selectedOptions
      ? [...selectedOptions]
      : []

    if (event.target.checked) {
      newSelectedOptions.push(optionIndex);
    } else {
      newSelectedOptions.splice(newSelectedOptions.indexOf(optionIndex), 1);
    }

    onOptionChange(newSelectedOptions);
  };
  
  return (
    <div className="checkbox-question">
      <h2>{question}</h2>
      <FormControl component="fieldset">
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedOptions?.includes(index)}
                onChange={handleCheckboxChange}
                value={index}
              />
            }
            label={option}
          />
        ))}
      </FormControl>
    </div>
  );
};

export {
  CheckboxQuestion,
  TextQuestion,
  RadioQuestion,
  LongTextQuestion
};