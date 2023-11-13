
import {gam1, gam2} from "./gamaFunction";

export function funcT(dof:any, x:number){
    let pi = 3.1416;
    let fun1
    let fun2
    let fun3
    let fun4
    let fun5
    let fun6
    let fun7
    let fun8
    let i = dof + 1;

    if(i%2 == 0){
        fun1 = gam1(i/2);

    }else {
        fun1 = gam2(i);
    }
    
    fun2 = Math.sqrt(dof * pi); 

    if(dof%2 == 0){
        fun3 = gam1(dof/2);
    }else {
        fun3 = gam2(dof);
    }

    fun4 = fun1 / (fun2*fun3);

    fun5= 1 + ((x*x)/dof);

    fun6 = (dof + 1)/2;

    fun7 = Math.pow(fun5, -fun6);

    fun8 = fun4 * fun7;

    return fun8;
}