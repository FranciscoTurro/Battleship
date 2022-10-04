const ship = (n) => {
  let length = n;
  let hits = [];

  const hit = (pos) => {
    if (pos > length || hits.includes(pos)) return;
    hits.push(pos);
  };

  const isSunk = () => {
    if (hits.length === length) return true;
    else return false;
  };

  return { length, hits, hit, isSunk };
};

export default ship;
