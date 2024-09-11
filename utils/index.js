export const checkUserAgent = () => {
  let check = false;
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  const userAgent = navigator.userAgent;

  toMatch.map((ele) => {
    if (userAgent.match(ele)) {
      check = true;
    }
  })
  return check;
};
