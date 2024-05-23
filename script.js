let sound;
let fft;
let circleSize;
function preload(){
  sound = loadSound('ludwig.mp3');
}

function setup(){
  
  let cnv = createCanvas(400,400);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);

  for (var i = 0; i<width;i++) {
    waveformDraw.push(0);
  }
}

// var angle;

var waveform = [];
var waveformDraw = [];

function draw(){

  // let spectrum = fft.analyze();
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i< spectrum.length; i++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

  var newWaveform = fft.waveform();
  waveform = waveform.concat(newWaveform);

  var samplesCount = 2;
  if (waveform.length > 1024*samplesCount) {
    // remove first 1024 samples
    waveform.splice(0, 1024);
  }

  if (frameCount % 1 == 0) {
    background('black');

    noFill();
    beginShape();
    stroke('gold');
    for (var i = 0; i < 1024; i++) {
      let x = map(i, 0, 1024, 0, width);
      
      var sum = 0;
      for(var j = 0; j<samplesCount; j++) {
        sum += waveform[i/samplesCount + j];
      }

      waveformDraw[x] = waveformDraw[x] * 0.9 + (sum/samplesCount) * 0.1;
      
      let y = map( waveformDraw[x], -0.1, 0.1, 0, height);
      line(x, height-y, x, y);
    }
    endShape();
  }
  waveform = newWaveform;

  // text('tap to play', 20, 20);

  // stroke(0, 0, 0, 50)
  // translate(width/2, height/2*1.5);

  // for(var i=0; i<6; i++) {
  //   rotate(2*PI/i);
  //   branch(50, spectrum.slice(0, spectrum.length/2));
  // }

}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}


// function branch(len, spectrum) {
//   var sum = 0;
//   for(var k=0; k<spectrum.length; k++) {
//   var angle = sum/(255*spectrum.length)*PI;
//     sum += spectrum[k];
//   }
//   beginShape();
//   // vertex(20, 20);
//   // vertex(45, 20);
//   // vertex(45, 80);

//   vertex(0, 0);
//   vertex(0, -len);
//   translate(0, -len);
//   if (len > 10) {
//   push();
//   rotate(angle);
//   branch(len * 0.75, spectrum.slice(0, spectrum.length/2))
//   pop();
//   push();
//   rotate(-angle);
//   branch(len * 0.75, spectrum.slice(spectrum.length/2, spectrum.length))
//   pop();  
//     endShape(CLOSE);

//   }
// }