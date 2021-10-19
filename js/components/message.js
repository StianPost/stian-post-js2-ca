export default function Message(className, message, domElm) {
  const html = `<div class="${className}">${message}</div>`;
  document.querySelector(domElm).innerHTML = html;
}
