const ship = (n) => {
  let length = n;
  let hitSpots = Array(n).fill(0);

  const hit = (n) => {
    hitSpots[n] = 1;
  };

  const isSunk = () => {
    return hitSpots.every((val) => val === 1); //returns true or false
  };

  return { length, isSunk, hit, hitSpots };
};

export default ship;
