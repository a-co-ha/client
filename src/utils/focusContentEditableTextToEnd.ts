export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  const selection = window.getSelection();
  const newRange = document.createRange();
  console.log(newRange);
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
