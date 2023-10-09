export function compute(x: number) {
    if (x > 0) {
      return x + 1;
    } else if (x < 0) {
      return 0;
    } else {
      return 2; 
    }
  }