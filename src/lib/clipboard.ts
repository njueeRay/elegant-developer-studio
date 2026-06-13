export async function writeToClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Browser clipboard permissions vary; fall through to the textarea fallback.
  }

  return writeWithTextarea(value);
}

function writeWithTextarea(value: string) {
  const textarea = document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";

  document.body.append(textarea);
  textarea.select();

  const didCopy = document.execCommand("copy");

  textarea.remove();

  return didCopy;
}
