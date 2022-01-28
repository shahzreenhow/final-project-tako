import React from "react"
import Takoimg from "../products/images/download4.jpeg"

function About() {
    return (
        <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${Takoimg})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        Takoyaki (たこ焼き or 蛸焼) or "octopus balls" (according to Anson)is a ball-shaped Japanese snack made of a wheat flour-based batter and cooked in a special molded pan. It is typically filled with minced or diced octopus (tako), tempura scraps (tenkasu), pickled ginger (beni shoga), and green onion (negi).[1][2] The balls are brushed with takoyaki sauce (similar to Worcestershire sauce) and mayonnaise, and then sprinkled with green laver (aonori) and shavings of dried bonito (katsuobushi). Yaki comes from yaku (焼く), which is one of the cooking methods in Japanese cuisine, meaning 'to grill', and can be found in the names of other dishes in Japanese cuisine such as okonomiyaki and ikayaki (other famous Osakan dishes).[3]
        </p>
      </div>
    </div>
    )
}

export default About;