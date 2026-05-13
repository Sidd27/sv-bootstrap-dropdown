import '@testing-library/jest-dom';

if (typeof Element !== 'undefined') {
  Element.prototype.animate = function () {
    const anim = {
      cancel() {},
      finish() {},
      finished: Promise.resolve(),
      onfinish: null,
      currentTime: 0,
      playbackRate: 1,
      playState: 'finished',
    };
    queueMicrotask(() => anim.onfinish?.());
    return anim;
  };
}
