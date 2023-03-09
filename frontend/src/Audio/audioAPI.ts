// import { analyze } from "web-audio-beat-detector";

type ProcessFrame = (data: Uint8Array) => number[];
type ProcessError = (error: Error) => void;


export class AudioVisualizer {
  audioContext: AudioContext;
  processFrame: ProcessFrame;
  processError: ProcessError;
  analyser: any;
  defaultFftSize: Number = 32;
  defaultSmoothingTimeConstant: Number = 0.8;

  constructor(audioContext: AudioContext, processFrame: ProcessFrame, processError: ProcessError) {
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    this.processError = processError
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.connectStream)
      .catch((error: Error) => {
        processError(error);
      });
  }

  async connectStream(stream: any) {
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.defaultSmoothingTimeConstant = 0.75;
    this.analyser.smoothingTimeConstant = this.analyser.defaultSmoothingTimeConstant;
    this.analyser.fftSize = this.defaultFftSize;
    this.initRenderLoop();
  }

  initRenderLoop() {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    const processFrame = this.processFrame || (() => { });
    const renderFrame = () => {
      this.analyser.getByteFrequencyData(frequencyData);
      const [fftSize, smoothingConstant] = processFrame(frequencyData);
      if (fftSize) {
        this.analyser.fftSize = fftSize
      }
      if (smoothingConstant) {
        this.analyser.smoothingTimeConstant = smoothingConstant
      }
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }
}
