import fs from "fs"
import path from "path";
import player from "node-wav-player";

const isDev=process.env.NODE_ENV!=='production'

const alarmAudioFP=!isDev?path.join(process.resourcesPath,'alarms','alarm1.wav'):path.join('./src','alarms','alarm1.wav')

function getWavDuration(filePath:fs.PathOrFileDescriptor) {
  const buffer = fs.readFileSync(filePath);

  const headerSize = 44;
  const sampleRate = buffer.readUInt32LE(24);  
  const numChannels = buffer.readUInt16LE(22);  
  const bitsPerSample = buffer.readUInt16LE(34); 

  const bytesPerSample = (bitsPerSample / 8) * numChannels;

  const totalBytes = buffer.length - headerSize;
  const totalSamples = totalBytes / bytesPerSample;

  const duration = totalSamples / sampleRate;
  return duration;
}


function playAlarm(audioPath:string) {
  player.play({
    path: audioPath, 
  }).then(() => {
    console.log('Sound played');
  }).catch((error:Error) => {
    console.error('Error:', error);
  });
}
function stopAlarm(alarmInterval:any) {
  clearInterval(alarmInterval); // Stop the loop
}

// Start the alarm
const playForInterval=()=>{
    const duration=1000*getWavDuration(alarmAudioFP)
    const alarmInterval=setInterval(()=>{playAlarm(alarmAudioFP)},duration+300);
    setTimeout(()=>{stopAlarm(alarmInterval)}, 4*60*1000); 
    return ()=>{stopAlarm(alarmInterval)};
}
export {playForInterval}
