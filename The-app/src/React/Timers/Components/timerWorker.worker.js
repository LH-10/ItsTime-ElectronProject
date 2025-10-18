let timerInterval
let time
self.addEventListener('message',function(e){
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
            clearInterval(timerInterval)
            console.log(timerInterval)
            break;
    }
})

