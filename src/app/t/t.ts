import { funcT } from "./fdex";

export function t(dof: any, num_seg: number, x1: number) {
  let w = x1 / num_seg;
  let wD3 = w / 3;
  let x = 0,
    integ = 0;
  let y, area;
  let i = 0;

  do {
    if (i == 0 || i == num_seg) {
      y = funcT(dof, x) * 1;
      area = y * wD3;
    } else if (i % 2 == 0) {
      y = funcT(dof, x) * 2;
      
      area = y * wD3;
    } else {
      y = funcT(dof, x) * 4;
      area = y * wD3;
    }

    x = x + w;
    integ = integ + area;
    i++;
  } while (i <= num_seg);

  return Number(integ.toFixed(5));
}
