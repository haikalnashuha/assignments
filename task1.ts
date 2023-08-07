function createTargetFunction(succeedsOnAttempt: number) {
    let attempt = 0;
    return async () => {
        if (++attempt === succeedsOnAttempt) {
            return attempt;
        }
        throw Object.assign(new Error(`failure`), { attempt });
    };
}

async function retryFailures<T>(fn: () => Promise<T>, retries: number): Promise<T> { 
    // your code here
    let error = null;
    let counter = 0;
    let result = null;
    do {
        error = null;
        await fn()
        .then((attempt)=> {
            result = attempt;                    
        })
        .catch((err)=> {
            error = err;
            counter++;
        });    
    }
    while(error && counter < retries);
    
    if (result)
        return result;
    return error;
}

//Test here!
retryFailures(createTargetFunction(10),10)
.then((attempt) => console.log("# attempts",attempt))
.catch((err) => console.log("error", err));

/*Examples
// succeeds on attempt number 3
retryFailures(createTargetFunction(3), 5).then((attempt) => {
    console.assert(attempt === 3);
});


// fails on attempt number 2 and throws last error
retryFailures(createTargetFunction(3), 2).then(() => {
        throw new Error('should not succeed');
    }, (e) => {
    console.assert(e.attempt === 2);
});

// succeeds
retryFailures(createTargetFunction(10), 10).then((attempt) => {
    console.assert(attempt === 10);
});
*/