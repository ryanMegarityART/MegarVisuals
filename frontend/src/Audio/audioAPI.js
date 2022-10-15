// import { analyze } from "web-audio-beat-detector";

export class AudioVisualizer {
  constructor(audioContext, processFrame, processError) {
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.connectStream)
      .catch((error) => {
        if (processError) {
          processError(error);
        }
      });
  }

  async connectStream(stream) {
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.defaultFftSize = 128
    this.analyser.defaultSmoothingTimeConstant = 0.5;
    this.analyser.smoothingTimeConstant = this.analyser.defaultSmoothingTimeConstant;
    this.analyser.fftSize = this.defaultFftSize;

    this.initRenderLoop();

    // console.log("about to analyse: ");

    // try {
    //   const buffer = this.analyser.createBuffer(32, 2550, 44100)
    //   console.log("buff: ", buffer)
    //   const tempo = await analyze(buffer)
    //   this.initRenderLoop(this.analyser, tempo);
    // } catch (err) {
    //   console.log("err analysing: ", err)
    // }

  }

  initRenderLoop() {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    const processFrame = this.processFrame || (() => { });
    // console.log("tempo: ", tempo);
    // const renderFrame = () => {
    //   this.analyser.getByteFrequencyData(frequencyData);
    //   const [fftSize, smoothingConstant] = processFrame(frequencyData);
    //   this.analyser.smoothingTimeConstant = smoothingConstant || this.defaultSmoothingTimeConstant;
    //   this.analyser.fftSize = fftSize || this.defaultFftSize;
    //   requestAnimationFrame(renderFrame);
    // };
    // requestAnimationFrame(renderFrame);

    setInterval(() => {
      this.analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);
      // requestAnimationFrame(renderFrame);
    }, 100);
  }
}
