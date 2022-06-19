import {time} from "./time";

const rtf =
  typeof Intl !== "undefined" ? new Intl.RelativeTimeFormat("en") : null;
export const timeDifference = rtf
  ? function timeDifference(timestamp: number) {
      const sPerMinute = 60;
      const sPerHour = sPerMinute * 60;
      const msPerDay = sPerHour * 24;

      const current = time();
      const elapsed = current - timestamp;

      if (elapsed < sPerMinute) {
        return rtf.format(-Math.floor(elapsed), "seconds");
      } else if (elapsed < sPerHour) {
        return rtf.format(-Math.floor(elapsed / sPerMinute), "minutes");
      } else if (elapsed < msPerDay) {
        return rtf.format(-Math.floor(elapsed / sPerHour), "hours");
      } else {
        return rtf.format(-Math.floor(elapsed / msPerDay), "days");
      }
    }
  : function timeDifference(timestamp: number) {
      return new Date(timestamp).toLocaleDateString();
    };
