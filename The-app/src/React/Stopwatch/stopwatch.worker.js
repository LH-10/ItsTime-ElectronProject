let milliseconds
let stopWatchInterval
self.addEventListener('message',(e)=>{
    switch(e.data.command){
        case 'start':
            milliseconds=parseInt(e.data.value)
            console.log(milliseconds)
            stopWatchInterval=setInterval(()=>{
                self.postMessage(milliseconds+10);
                milliseconds=milliseconds+10;
            },10)
            break;
        case 'stop':
            clearInterval(stopWatchInterval)
            console.log(stopWatchInterval)
            break;
    }
})
