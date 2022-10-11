import qs from 'query-string';

function beautifyUrl(path, config = {}) {
  let tempUrl = path;

  if (config.params) {
    Object.keys(config.params).forEach((param) => {
      tempUrl = tempUrl.replace(`:${param}`, config.params[param]);
    });
  }

  if (config.query) {
    tempUrl += `?${qs.stringify(config.query, { arrayFormat: 'comma' })}`;
  }

  return tempUrl;
}

export default beautifyUrl;
