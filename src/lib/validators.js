const farklePattern = /^[fF]([123456])([lL]([1-9][0-9]*))?$/;
const pointsPattern = /^([1-9][0-9]*)$/;
const partialPattern = /^[pP]([1-9][0-9]*)$/;

export const isFarkle = (score) => {
  return score.match(farklePattern);
}

const isPoints = (score) => {
  return score.match(pointsPattern);
}

export const isPartial = (score) => {
  return score.match(partialPattern);
}

export const partialScore = (score) => {
  return +score.match(partialPattern)[1];
}

const farkleDice = (score) => {
  return +score.match(farklePattern)[1];
}

export const mergeScore = (score, partials) => {
  if (isFarkle(score)) {
    if (score.match(farklePattern)[3]) {
      return {
        farkleDice: +score.match(farklePattern)[1],
        partials: [...partials, +score.match(farklePattern)[3]]
      };
    } else {
      return {
        farkleDice: +score.match(farklePattern)[1],
        partials: partials
      };
    }
  }
  return {
    farkleDice: 0,
    partials: [...partials, +score],
    score: partials.reduce((sum, s) => sum + s, +score)
  };
}

export const validScore = (score) => {
  if (isFarkle(score)) {
    return true;
  } else if (isPartial(score)) {
    return true;
  }
  return score !== '' && +score !== 0 && +score % 50 === 0;
}
