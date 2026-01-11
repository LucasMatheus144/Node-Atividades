function ensureEnum(value, allowed, message) {
  if (value === undefined || value === null) return;
  if (!allowed.includes(value)) {
    const err = new Error(message);
    err.status = 400;
    throw err;
  }
}

function ensureNotEmptyString(value, message) {
  if (value === undefined || value === null) return;
  if (typeof value !== 'string' || value.trim().length === 0) {
    const err = new Error(message);
    err.status = 400;
    throw err;
  }
}


module.exports = {
  ensureEnum,
  ensureNotEmptyString
};