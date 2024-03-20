export function rAFWithControl(fps: number, callback: Function) {
  let delay = 1000 / fps, // calc. time per frame
    time: number | null = null, // start time
    frame: number = -1, // frame count
    tref: number; // rAF time reference

  function loop(timestamp: number) {
    if (time === null) time = timestamp; // init start time
    const seg = Math.floor((timestamp - time!) / delay); // calc frame no.
    if (seg > frame) {
      // moved to next frame?
      frame = seg; // update
      callback({
        // callback function
        time: timestamp,
        frame: frame,
      });
    }
    tref = requestAnimationFrame(loop);
  }

  return {
    start: () => {
      cancelAnimationFrame(tref);
      tref = requestAnimationFrame(loop);
    },
    stop: () => {
      cancelAnimationFrame(tref);
    },
  };
}
