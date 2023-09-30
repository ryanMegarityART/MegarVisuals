export function cancelAllAnimationFrames() {
  var id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
}
