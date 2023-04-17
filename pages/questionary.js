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
    options: ["Red", "Green", "Blue"],
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
    options: ["Option" , "Option Q"],
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
    text: "Question 8",
    options: ["Option R", "Option S"],
    conditions: {
      "Option R": 10,
      "Option S": 10
    },
    type: 'radio'
  },
  10: {
    text: "Question 8",
    options: ["Option R", "Option S"],
    conditions: {
      "Option R": 11,
      "Option S": 11
    },
    type: 'radio'
  },
  11: {
    text: "The end"
  },
 };

const Questionary = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestionId]: answer });
  };
  
  const handlePrevious = () => {
    const answerKeys = Object.keys(answers);
    if (
      answerKeys.includes(String(currentQuestionId)) &&
      answerKeys[answerKeys.length - 1] !== currentQuestionId
    ) {
      const questionPosition = answerKeys.indexOf(String(currentQuestionId))
      if (questionPosition) {
        setCurrentQuestionId(answerKeys[questionPosition - 1])
      }
    } else {
      setCurrentQuestionId(answerKeys.length)
    }
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestionId];
    const currentCondition = graph[currentQuestionId].conditions;
    
    setCurrentQuestionId(currentCondition[currentAnswer]);
  };

  const renderQuestion = () => {
    const question = graph[currentQuestionId];
    if (!question) {
      return <div>Question not found</div>;
    }
    const { text, options } = question;

    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            question={text}
            answer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'radio':
        return (
          <RadioQuestion
            question={text}
            answers={options}
            selectedAnswer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'longtext':
        return (
          <LongTextQuestion
            question={text}
            answer={answers[currentQuestionId]}
            onAnswerChange={handleAnswer}
          />
        );
      case 'checkboxes':
        return (
          <CheckboxQuestion
            question={text}
            options={options}
            selectedOptions={answers[currentQuestionId]}
            onOptionChange={handleAnswer}
          />
        );
      default:
        return <div>Question not found</div>;
    }
  };

  return (
    <Card>
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