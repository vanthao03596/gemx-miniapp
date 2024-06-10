/* eslint-disable no-var */

export default function stripTag(html: string) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}
