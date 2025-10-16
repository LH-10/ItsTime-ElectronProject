let timerInterval
let time
self.addEventListener('message',function(e){
    console.log("hereworker")
    switch(e.data.command){
        case 'start':
            time=parseInt(e.data.value)
            console.log(time)
            timerInterval=setInterval(()=>{
                self.postMessage(time-1);
                time=time-1;
            },1000)
            break;
        case 'stop':
            console.log("here stop")
            clearInterval(timerInterval)
            console.log(timerInterval)
            break;
    }
})

