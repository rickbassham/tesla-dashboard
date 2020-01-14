import jsonp from "simple-jsonp-promise";

export default function shorten(url) {
  return new Promise((resolve, reject) => {
    jsonp("https://is.gd/create.php?format=json&url=" + encodeURIComponent(url)).then(obj => {
      if (obj.shorturl) {
        resolve(obj.shorturl);
      } else {
        reject(obj);
      }
    }).catch(e => {
      reject(e);
    })
  });
}
