export const createNode = (
  contentEditable: React.RefObject<HTMLDivElement>,
  tag: string
) => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0);
    let newNode = document.createElement(tag);
    if (contentEditable.current) {
      newNode.textContent = contentEditable.current.innerText.replace(
        /\/$/,
        ''
      );
      contentEditable.current.innerText = '';
    }

    range.deleteContents();
    range.insertNode(newNode);
    const newRange = document.createRange();
    newRange.setStartAfter(newNode);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};
