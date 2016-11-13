import $ from 'jquery';
const SCROLL_DELAY = 1000;

export const scrollToElement = ({ containerSelector = 'html, body', element }) => {
  $(containerSelector).animate({
    scrollTop: $(element).offset() && $(element).offset().top,
  }, SCROLL_DELAY);
};
