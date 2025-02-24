import { createSignal } from 'solid-js';

export const [today, setToday] = createSignal(new Date());

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') {
    return;
  }

  const oldDate = today();
  const newDate = new Date();

  // I even benchmarked ways to compare dates, this is fastest
  if (
    // If we pass to another day, change it
    !(
      // We're so extra that we event optimized the order
      // And we've also benchmarked AND vs OR, AND was faster, by a wee bit
      (
        oldDate.getDate() === newDate.getDate() &&
        oldDate.getMonth() === newDate.getMonth() &&
        oldDate.getFullYear() === newDate.getFullYear()
      )
    )
  ) {
    setToday(newDate);
  }
});
