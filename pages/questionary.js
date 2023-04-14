import React from "react";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import LocationOn from "@material-ui/icons/LocationOn";
import Carousel from "react-slick";
import Header from "/components/Header/Header.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import questions from "../questions.json"

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

const Questionary = (props) => {
    const classes = useStyles();
    const { ...rest } = props;
    const questionList = questions.questions
    console.log(questionList)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };

    return (
      <div>
        <Header
            brand={questions.title}
            fixed
            color="primary"
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
            {...rest}
        />
        
        <div className={classNames(classes.main)} style={{marginTop: '70px'}}>
            <div className={classes.container}>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
                    <Card carousel>
                    <Carousel {...settings}>
                        {questionList.length && questionList.map(question => {
                            return (
                                <div>
                                    <h1>{question.title}</h1>
                                    <h4>{question.description}</h4>
                                </div>
                            )
                        })}

                        <div>
                            <img
                                src="/img/bg3.jpg"
                                alt="Third slide"
                                className="slick-image"
                            />
                            <div className="slick-caption">
                                <h4>
                                    <LocationOn className="slick-icons" />
                                    Yellowstone National Park, United States
                                </h4>
                            </div>
                        </div>
                    </Carousel>
                    </Card>
                </GridItem>
                </GridContainer>
            </div>
            </div>
      </div>
    );
  }
  
export default Questionary;