export const createImageNode = (
  contentEditable: React.RefObject<HTMLDivElement>,
  imgUrl: string
) => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0);
    let newNode = document.createElement('img');
    newNode.setAttribute('width', '50%');
    if (contentEditable.current) contentEditable.current.innerText = '';
    newNode.setAttribute('src', imgUrl);
    range.deleteContents();
    range.insertNode(newNode);
    const newRange = document.createRange();
    newRange.setStartAfter(newNode);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};
