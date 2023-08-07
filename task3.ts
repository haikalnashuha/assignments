let schedules: [string, string][][] = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];

function findBossesFreeTime(schedulesArr: [string, string][][], duration: number) : string | null {
    //looping the schedule
    //find every free time in the tuples for each row
    //if fails in any row, return nulls
    //if succeed in current row, proceeds next

    //free time for each boss will be stored in array
    //["12:15"],["15:15"]...
    //
    let latestEarliest;
    let bossesFreeTime = []; 

    for (let i=0; i < schedulesArr.length; i++) {
        let resultArr = [];

        const tuplesArr = schedulesArr[i];
        console.log("schedules first", tuplesArr);
        for (let j=0; j < tuplesArr.length; j++) {
            const currIntvl = tuplesArr[j];
            console.log("currIntvl", tuplesArr[j]);
            
            if (j+1 < tuplesArr.length) {
                const nextIntvl = tuplesArr[j+1];
                console.log("nextIntvl", nextIntvl);
                
                const startTime = new Date(2023,0,1, Number(currIntvl[1].split(":")[0]), Number(currIntvl[1].split(":")[1]));
                //end time exclusive the starting minute (e.g start at 11:30, the interval 11:29)
                const endTime = new Date(2023,0,1, Number(nextIntvl[0].split(":")[0]), Number(nextIntvl[0].split(":")[1]) - 1);
                
                const timeSpan = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
                
                if (timeSpan >= duration) {
                    resultArr.push({startTime: startTime, endTime: endTime, duration: timeSpan});
                }
            } else {               
                const startTime = new Date(2023,0,1, Number(currIntvl[1].split(":")[0]), Number(currIntvl[1].split(":")[1]));
                //end working time
                const endTime = new Date(2023, 0, 1, 18, 59);
                const timeSpan = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
                
                if (timeSpan >= duration) {
                    resultArr.push({startTime: startTime, endTime: endTime, duration: timeSpan});
                }
            }
            
        }
        bossesFreeTime.push(resultArr);    
    }
    
    //find the earliest possible time        
    let earliest;
    const maxPossible = new Date(2023, 0, 1, 18, 59).getTime() - (duration * 60 * 1000);
    const minPossible = new Date(2023, 0, 1, 9, 0);
    
    latestEarliest = minPossible;
    for (let i=0; i < bossesFreeTime.length; i++) {
    
        //some of the bosses doesnt have free time. return null
        if (bossesFreeTime[i].length <=0)
            return null;

        const eachEarliest = bossesFreeTime[i][0];
        
        if (eachEarliest.startTime.getTime() >  latestEarliest.getTime())
            latestEarliest = eachEarliest.startTime;
    }


    console.log("latestEarliest", `${latestEarliest.getHours()}:${latestEarliest.getMinutes()}`);
    
    return `${latestEarliest.getHours()}:${latestEarliest.getMinutes()}`;
} 

findBossesFreeTime(schedules, 60);