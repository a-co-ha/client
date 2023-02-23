const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  console.log(range);
  console.log(selection);
  range.selectNodeContents(element);
  range.collapse(false);
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  element.focus();
};

export default setCaretToEnd;
