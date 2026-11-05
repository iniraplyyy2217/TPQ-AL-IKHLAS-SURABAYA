// Audio Synthesizer for Kids Celebration & Clapping Effects
// Uses Web Audio API for zero-latency, reliable sound without external asset loading

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a realistic applause / clapping sound sequence with celebratory chimes
 */
export function playApplauseSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Play celebratory major chord chimes (Do - Mi - Sol - Do Tinggi)
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0, now + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.45);
  });

  // 2. Synthesize randomized clapping sounds (bursts of band-pass filtered pink noise)
  const totalClaps = 24;
  for (let i = 0; i < totalClaps; i++) {
    // stagger claps naturally over 1.6 seconds
    const clapTime = now + 0.25 + (i * 0.05) + (Math.random() * 0.04);
    createSingleClap(ctx, clapTime);
  }
}

function createSingleClap(ctx: AudioContext, time: number) {
  // Generate short noise buffer for palm strike
  const bufferSize = ctx.sampleRate * 0.05; // 50ms clap
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // white/pink noise hybrid
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  // Bandpass filter centered around 1000 - 1400Hz (human hand clap frequency)
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000 + Math.random() * 400, time);
  filter.Q.setValueAtTime(2.5, time);

  // Volume envelope
  const gain = ctx.createGain();
  const volume = 0.3 + Math.random() * 0.25;
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

  noiseNode.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseNode.start(time);
  noiseNode.stop(time + 0.06);
}

/**
 * Plays a gentle encouraging chime for answering questions
 */
export function playTryAgainSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.linearRampToValueAtTime(260, now + 0.25);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}

/**
 * Speech synthesis for recitation / audio preview of surat pendek
 */
export function speakText(text: string, lang = 'id-ID') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}
