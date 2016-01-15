export function getOwner(baseUrl){
  var res = baseUrl.split('/');
  return res[3];
}

export function handleError(res, err) {
  return res.status(500).send(err);
}

