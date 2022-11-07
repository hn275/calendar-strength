function parseTime(timeStr) {
    if (typeof timeStr !== 'string') {
      throw new Error(
        `invalid argument type, expected type string, got type: ${typeof timeStr}`
      );
    }
  
    const timeMatched = timeStr.split(/[a-zA-Z]/g);
    if (timeMatched === null) {
      throw new Error(`${timeStr} has no valid delimiter`);
    }
    if (timeMatched.length !== 2) {
      throw new Error(`expected: [date, time], got: ${timeMatched}`);
    }
  
    const [date, time] = timeMatched;
  
    // parsing date
    let dateInt;
    dateInt = date.match(/\d/g);
    dateInt = dateInt.join('');
    dateInt = Number(dateInt);
  
    // parsing time
    let timeInt;
    timeInt = time.match(/\d/g);
    timeInt = timeInt.join('');
    timeInt = timeInt.slice(0, 4);
    timeInt = Number(timeInt);
  
    return [dateInt, timeInt];
  };


  function getTimeInterval(startTime, endTime){
    if (typeof startTime !== 'number' || typeof endTime !== 'number') {
      throw new Error(
        `invalid argument: expected type number, got ${typeof startTime} ${typeof endTime}`
      );
    }
  
    if (startTime < 0 || endTime < 0) {
      throw new Error(
        `invalid argument, time has to be a positive integer, got ${startTime}, ${endTime}`
      );
    }
  
    if (startTime >= endTime) {
      return [];
    }
  
    const timeIntervals = [];
    let currentTime = startTime;
  
    while (currentTime <= endTime) {
      timeIntervals.push(currentTime);
  
      if (currentTime % 100 === 30) {
        // if it's in the half an hour mark
        currentTime += 70;
      } else {
        // if it is not in the half an hour mark
        currentTime += 30;
      }
    }
  
    return timeIntervals;
  };


function getAavilabilities(availabilities){

    let people = []
    let index = 0 

    for (let availability of availabilities){
    let startDateAndTime;
    let endDateAndTime; 
    let timesInBetween;
    let sameDateTimeObjects = []
    let times = availability.times
    for (let time of times){
        startDateAndTime = parseTime(time.startTime)
        endDateAndTime = parseTime(time.endTime)
        timesInBetween = getTimeInterval(startDateAndTime[1], endDateAndTime[1])
        for (let halfHour of timesInBetween){
        sameDateTimeObjects.push({date: startDateAndTime[0], hourMin: halfHour})
        }
    }
    let number = Number(availability.number) 
    let name = availability.name 
    people.push({ name: name, number: number, timesAvailable: []})
    people[index].timesAvailable.push(...sameDateTimeObjects)
    index += 1
    }
    
    let allTimes = []

    for(let person of people){
      for(let time of person.timesAvailable){
        if(allTimes.length === 0){
          allTimes.push({ fullTime: time, peopleAvailableNumbers: [], peopleAvailableNames: []})
        }else {
          let flag = false 
          for(let curTime of allTimes){
            if (curTime.fullTime.date === time.date && curTime.fullTime.hourMin === time.hourMin){
              flag = true
              break
            }
          }
          if(!flag){
              allTimes.push({ fullTime: time, peopleAvailableNumbers: [], peopleAvailableNames: []})
          }
        }
      }
    }
  
    for (let time of allTimes){
      for(let person of people){
        for(let timeAvailable of person.timesAvailable){
          if(time.fullTime.date === timeAvailable.date && time.fullTime.hourMin === timeAvailable.hourMin){
            time.peopleAvailableNumbers.push(person.number)
            time.peopleAvailableNames.push(person.name)
          }
        }
      }
    }
    
  
    let dates = []
    
    for (let time of allTimes){
      if(!dates.includes(time.fullTime.date)){
        dates.push(time.fullTime.date)
      }
    }
    
    let availabilitiesToReturn = []
  
    for(let date of dates){
      let sameDateObjects = getTimeObjects(date, allTimes)
      let next = 1
      let afterFirstIntersection = []
      for(let current = 0; current < sameDateObjects.length; current++){
        if(next != sameDateObjects.length){
          let namesWithSameAvailability = sameDateObjects[current].names.filter(value => sameDateObjects[next].names.includes(value));
          let numbersWithSameAvailability = sameDateObjects[current].numbers.filter(value => sameDateObjects[next].numbers.includes(value));
          let startTime = sameDateObjects[current].timeAvailable
          let endTime = sameDateObjects[next].timeAvailable
          afterFirstIntersection.push({names: namesWithSameAvailability, numbers: numbersWithSameAvailability, startTime: startTime, endTime: endTime})
        }
        next += 1
      }
      
      let subsequentIntersections = []
      subsequentIntersections.push(...afterFirstIntersection)

      console.log(subsequentIntersections)
    
      while(checkIfIntersectionNeeded(subsequentIntersections)){
        subsequentIntersections = intersect(subsequentIntersections)
      }
      availabilitiesToReturn.push(...subsequentIntersections)
    }

    console.log(availabilitiesToReturn)
   

  
   
    }
  
    
    function convertBackToString(date, hourMin){
        let stringDate = String(date)
        let stringTime = String(hourMin)
        let finalDate = stringDate[0] + stringDate[1] + stringDate[2] + stringDate[3] + "-" + stringDate[4]+ stringDate[5] + "-" + stringDate[6] + stringDate[7] + "T" + stringTime[0] + stringTime[1] + ":" + stringTime[2] + stringTime[3] + ":00" 

        return finalDate
    }
  
  
    function sortTimeObjects(objects){
      let hourMinWithPeople = []
      let times = []
  
      for (let object of objects){
        hourMinWithPeople.push({names: object.names, numbers: object.numbers, hourMin: object.timeAvailable})
        times.push(object.timeAvailable)
      }
  
      times.sort(function(a, b) {
        return a - b;
      });
  
      let sortedObjects = []
  
      for (let time of times){
        for(let person of hourMinWithPeople){
          if (person.hourMin === time){
            sortedObjects.push({timeAvailable: time, names: person.names, numbers: person.numbers})
            break
          }
        }
      }
  
      return sortedObjects
    }
  
  
    function getTimeObjects(date, allTimes) {
  
      let sameDateObjects = []
      for (let time of allTimes ) {
        if (time.fullTime.date === date ) {
          sameDateObjects.push({timeAvailable: time.fullTime.hourMin, names: time.peopleAvailableNames, numbers: time.peopleAvailableNumbers})
        }
      }
      
      sameDateObjects = sortTimeObjects(sameDateObjects)
     
      return sameDateObjects
    }
  
    function compareArrays(array1, array2){
  
      if(array1.sort().join(',') === array2.sort().join(',') && array1.length === array2.length){
        return true
      }
        return false 
    }
  
  
    function checkIfIntersectionNeeded(objects){
      let next = 1
      for(let current = 0; current < objects.length; current++){
        if (next != objects.length){
          let curNumbers = objects[current].numbers
          let nextNumbers = objects[next].numbers
          if(compareArrays(curNumbers, nextNumbers)){
            return true
          }
        }
        next += 1
      }
      return false
    }
  
    function intersectArrays(objects, currentIndex, nextIndex){
  
      let namesWithSameAvailability = objects[currentIndex].names.filter(value => objects[nextIndex].names.includes(value));
      let numbersWithSameAvailability = objects[currentIndex].numbers.filter(value => objects[nextIndex].numbers.includes(value));
      let startTime = objects[currentIndex].startTime
      let endTime = objects[nextIndex].endTime
      
      return {names: namesWithSameAvailability, numbers: numbersWithSameAvailability, startTime: startTime, endTime: endTime}
    }
  
    function intersect(objects){
      let next = 1
      let finalIntersectedResults = []
      for(let current = 0; current < objects.length; current++){
        if (next != objects.length){
          let curNumbers = objects[current].numbers
          let nextNumbers = objects[next].numbers
          if(compareArrays(curNumbers, nextNumbers)){
            let intersectedObject = intersectArrays(objects, current, next)
            finalIntersectedResults.push(intersectedObject)      
          }else{
            finalIntersectedResults.push(objects[current])
          }
        }
        next += 1
      }
      return finalIntersectedResults
    }
  
    


const availabilites = [
    {
      weekOf: '2022-10-30',
      times: [
        {
          startTime: '2012-10-26T13:00:00',
          endTime: '2012-10-26T14:00:00',
        }
      ],
      name: 'Grace',
      number: '125',
    },
    {
      weekOf: '2022-10-30',
      times: [
        {
          startTime: '2012-10-26T12:00:00',
          endTime: '2012-10-26T16:00:00',
        },
      ],
      name: 'Aman',
      number: '143',
    },
    {
      weekOf: '2022-10-30',
      times: [
        {
          startTime: '2012-10-27T14:00:00',
          endTime: '2012-10-27T15:00:00',
        }, 
      ],
      name: 'Hal',
      number: '123',
    },
  ];

  getAavilabilities(availabilites)
