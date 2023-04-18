import React, { useState } from "react";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import questionsData from "../questions.json"
import {
  CheckboxQuestion,
  TextQuestion,
  RadioQuestion,
  LongTextQuestion
} from "../components/FormHelper/FormHelper.js";

import { Button } from '@material-ui/core';


// question type TEXT && LONGTEXT
// {
//   text: "Question 2",
//   next: 5,
//   type: 'text'
// }
//
// question type CHECKBOX
// {
//   text: "Question 2",
//   options: ["Red", "Green", "Blue"],
//   conditions: {
//     '[0,1]': 5,
//     "Default": 6
//   },
//   type: 'checkboxes'
// }
//

const graph = {
  1: {
    text: "Question 1",
    options: ["First", "Second", "Third"],
    conditions: {
      "First": 2,
      "Second": 3,
      "Third": 4,
    },
    type: 'radio'
  },
  2: {
    text: "Question 2",
    options: ["Red", "Green"],
    conditions: {
      "Red": 5,
      "Green": 6
    },
    type: 'radio'
  },
  3: {
    text: "Question 3",
    options: ["Option 1", "Option 2"],
    conditions: {
      "Option 1": 8,
      "Option 2": 9
    },
    type: 'radio'
  },
  4: {
    text: "Question 4",
    options: ["Option A", "Option B"],
    conditions: {
      "Option A": 9,
      "Option B": 10
    },
    type: 'radio'
  },
  5: {
    text: "Question 5",
    options: ["True", "False"],
    conditions: {
      "True": 6,
      "False": 11
    },
    type: 'radio'
  },
  6: {
    text: "Question 6",
    options: ["Option X", "Option Y"],
    conditions: {
      "Option X": 7,
      "Option Y": 11
    },
    type: 'radio'
  },
  7: {
    text: "Question 7",
    options: ["Option P" , "Option Q"],
    conditions: {
      "Option P": 11,
      "Option Q": 11
    },
    type: 'radio'
  },
  8: {
    text: "Question 8",
    options: ["Option R", "Option S"],
    conditions: {
      "Option R": 10,
      "Option S": 10
    },
    type: 'radio'
  },
  9: {
    text: "Question 9",
    options: ["Option R", "Option S"],
    conditions: {
      "Option R": 10,
      "Option S": 10
    },
    type: 'radio'
  },
  10: {
    text: "Question 10",
    options: ["Option R", "Option S"],
    conditions: {
      "Option R": 11,
      "Option S": 11
    },
    dependency: {
      id: "4",
      next: "2"
    },
    type: 'radio'
  },
  11: {
    text: "Thanks for your time!",
    type: 'submit'
  },
 };

const deleteFieldsAfterId = (id, obj) => {
  const keys = Object.keys(obj);
  const index = keys.indexOf(String(id));
  if (index >= 0) {
    const newKeys = keys.slice(0, index + 1);
    return newKeys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  }
  return obj;
}

const Questionary = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestionId]: answer });
  };
  
  const handlePrevious = () => {
    const answerKeys = Object.keys(answers);
    const currentAnswerIndex = answerKeys.indexOf(String(currentQuestionId));

    if (currentAnswerIndex > 0) {
      setCurrentQuestionId(answerKeys[currentAnswerIndex - 1]);
    } else {
      setCurrentQuestionId(answerKeys[answerKeys.length - 1]);
    }
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestionId];
    const isChoose = graph[currentQuestionId].conditions;
    const dependency = graph[currentQuestionId].dependency;
    const answerKeys = Object.keys(answers); 
    
    const currentCondition = isChoose 
      ? graph[currentQuestionId].conditions
      : graph[currentQuestionId].next
     
    if (dependency && answerKeys.includes(dependency.id)) {
      setCurrentQuestionId(dependency.next)
    } else {
      setCurrentQuestionId(() => {
        return isChoose 
          ? currentCondition[currentAnswer] || 
            currentCondition[`[${String(currentAnswer)}]`] || 
            currentCondition['Default'] 
          : currentCondition
      });
    }
    handleChangedAnswer(currentCondition[currentAnswer]);

    console.log(answers)
  };

  const handleChangedAnswer = (currentAnswerId) => {
    const answerKeys = Object.keys(answers);

    if (!answerKeys.includes(String(currentAnswerId))) {
      setAnswers(deleteFieldsAfterId(currentQuestionId, answers))
    }
  }

  const handleSubmit = () => {
    console.log(answers)
  }

  const renderQuestion = () => {
    const question = graph[currentQuestionId];

    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            question={question.text}
            answer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'radio':
        return (
          <RadioQuestion
            question={question.text}
            answers={question.options}
            selectedAnswer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'longtext':
        return (
          <LongTextQuestion
            question={question.text}
            answer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'checkboxes':
        return (
          <CheckboxQuestion
            question={question.text}
            options={question.options}
            selectedOptions={answers[currentQuestionId]}
            onOptionChange={handleAnswer}
          />
        );
      case 'submit':
        return (
          <>
            <h2>{question.text}</h2>
            <Button 
              color="primary"
              onClick={handleSubmit}
            >Submit</Button>
          </>
        );
      default:
        return <div>Question not found</div>;
    }
  };

  return (
    <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CardHeader title="Questionare" />
      <CardBody>
        {renderQuestion()}
        <div>
          <Button
            color="primary"
            disabled={currentQuestionId === 1} 
            onClick={handlePrevious}
          >
            Previous
          </Button>
          
          <Button 
            color="primary"
            disabled={!answers[currentQuestionId]} 
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );

};
  
export default Questionary;