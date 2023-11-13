export function gam1(dof: any) {
  let mult = 1;
  let gam;
  do {
    dof = dof - 1;
    mult = dof * mult;
  } while (dof !== 1);
  gam = mult
  return gam;
}

export function gam2(dof: any) {
  let mult = 1;
  let div, gam;
  do {
    dof = dof - 2;
    div = dof / 2;
    mult = div * mult;
  } while (dof > 1);
  gam = mult * 1.77245
  return gam;
}
