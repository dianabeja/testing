// src/app/common/calculate.ts

export class Calculate {
    static sum(data: number[]): number {
        return data.reduce((acc, value) => acc + value, 0);
    }

    static sumXY(x: number[], y: number[]): number {
        return this.sum(x.map((value, index) => value * y[index]));
    }

    static sumX(x: number[]): number {
        return this.sum(x);
    }

    static sumYY(y: number[]): number {
        return this.sum(y.map(value => value * value));
    }

    static B1(x: number[], y: number[]): number {
        const N = x.length;
        return (N * this.sumXY(x, y) - this.sumX(x) * this.sum(y)) /
               (N * this.sumYY(x) - Math.pow(this.sumX(x), 2));
    }

    static B0(x: number[], y: number[]): number {
        return (this.sum(y) - this.B1(x, y) * this.sumX(x)) / x.length;
    }

    static yk(x: number[], y: number[], xk: number): number {
        return this.B0(x, y) + this.B1(x, y) * xk;
    }
}
