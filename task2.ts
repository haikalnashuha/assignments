function defaultArguments(fn: (x?:any, y?:any) => any, {a=0,b=0, ...c}:{a?:number, b?:number, c?:number|object|null}){
    let prev = fn(a,b);
                
    return (function(m?: number, n?: number) {
        if (!a && !b) {
            prev = fn(NaN, NaN);
            if (m && n) {
                return fn(m,n);
            } else if (!m && n) {
                return fn(prev, n);
            } else if (m && !n) {
                return fn(m, prev);
            }
        } else {
            if (!m && !n) {
                return fn(a,b);
            } else if (!m && n) {                
                return fn(prev, n);
            } else if (m && !n) {
                return fn(m, prev);
            } else if (m && n) {                
                return fn(m, n)
            }
        }         
    });
}  


function add(a, b) {
    return a + b;
};

const add2 = defaultArguments(add, {b:9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13); //<---- I think this should be 15 (3,5) then add 10 = 15 no?
console.assert(add3() === 5);


const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't 
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);

const add5 = defaultArguments(add2, { a: 10 }); //extends add2
console.assert(add5() === 19); // a=10, b=9//
