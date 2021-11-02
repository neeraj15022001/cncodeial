export function getFromBody(params) {
  let formBody = [];
  for (let i in params) {
    let encodedKey = encodeURIComponent(i);
    let encodedValue = encodeURIComponent(params[i]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
