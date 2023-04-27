import React from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

const movetoTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

if (window.location.pathname.includes('menu')) {
  window.onscroll = function () {
    scrollFunction();
  };
}

const scrollFunction = () => {
  let scrollBtn = document.getElementById('scrollUpBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
};

const ScrollTopButton = () => {
  return (
    <div id="scrollUpBtn">
      <BsFillArrowUpSquareFill onClick={movetoTop} />
    </div>
  );
};

export default ScrollTopButton;
