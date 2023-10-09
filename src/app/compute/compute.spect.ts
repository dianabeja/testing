import {compute} from './compute'

describe ('compute', ()=>{
    it('debera retornanr 0 si el imput es negativo', () => {
        const result = compute(-1);
        expect(result).toBe(0);
    })

    it('debera incrementar el imput, si este es positivo', () => {
        const result = compute(1);
        expect(result).toBe(2);
    })
})

