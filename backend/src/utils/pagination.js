async function getPaginationInfo(data, total, limit) {
  return {
    totalItems: total,
    numberOfPage: Math.ceil(total / limit),
    items: data
  };
}

module.exports = { getPaginationInfo };
