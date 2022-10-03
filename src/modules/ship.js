const ship = (n) => {
  let length = n;
  let hitSpots = [];

  const hit = (pos) => {
    if (hitSpots.includes(pos)) return;
    hitSpots.push(pos);
  };

  const isSunk = () => {
    if (hitSpots.length == length) return true;
    else return false;
  };

  return { length, isSunk, hit, hitSpots };
};

export default ship;
