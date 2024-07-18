import React from "react";
import bgElement1 from "../images/bg_form_2.png";
import emojiMain from "../images/emoji_icons/mainPage_emoji.png";

export default function bgElements() {
  return (
    <div>
      <img
        className="max-1350:hidden md:block max-w-[75.2rem] max-1455:-left-[20.8rem] max-1580:-left-[18.1rem] fixed -bottom-3 -left-[12rem] z-[-50]"
        src={bgElement1}
        alt=""
      />
      <img
        className="absolute max-970:max-w-[82rem] between-971-1090:max-w-[91rem] between-1091-1150:w-[91rem] between-1151-1251:max-w-[92.5rem] min-1350:hidden max-w-[100rem] mx-auto max-1350:-mb-[10rem] max-1350:static max-1350:pl-16 max-1350:pr-16  max-1350:transform-[translate-x-1/2] z-[-50]"
        src={bgElement1}
        alt=""
      />
      <div id="images_wrapper" className="relative flex justify-center">
        <img
          className="max-1350:hidden max-1580:w-[25.5rem] max-1580:-bottom-[3.7rem] fixed -bottom-[4rem] ml-16 left-3/4 transform -translate-x-1/2 w-[27.1rem] z-[-20]"
          src={emojiMain}
          alt=""
        />
      </div>
    </div>
  );
}
