export default function addLineInner(textElement) {
  textElement.find('.line').each(function (index) {
    let lineContent = $(this).html();
    $(this).html('');
    $(this).append(
      `<span class="line-inner" style="display: block;">${lineContent}</span>`
    );
  });
}
