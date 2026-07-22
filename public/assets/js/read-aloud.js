// Global read-aloud functionality (text-to-speech) using the browser's built-in voices.
// Voice quality varies wildly by browser/OS, so we rank the available voices and pick
// the best-sounding natural feminine one instead of whatever the default happens to be.

const VOICE_PRIORITY = [
  // Microsoft Edge neural/online voices - genuinely natural, not robotic
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Michelle Online (Natural)',
  'Microsoft Ana Online (Natural)',
  // macOS/iOS - Samantha is a solid natural-sounding default
  'Samantha',
  // Chrome/Android WaveNet-backed voices
  'Google US English',
  'Google UK English Female',
  // Decent fallbacks
  'Microsoft Zira Desktop',
  'Victoria',
  'Karen',
  'Moira',
  'Tessa',
  'Fiona'
];

const getVoicesAsync = () => new Promise((resolve) => {
  const existing = speechSynthesis.getVoices();
  if (existing.length) {
    resolve(existing);
    return;
  }
  speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
  // Fallback in case onvoiceschanged never fires
  setTimeout(() => resolve(speechSynthesis.getVoices()), 500);
});

const pickBestVoice = (voices) => {
  for (const name of VOICE_PRIORITY) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  // Any voice explicitly marked natural/neural and feminine
  const natural = voices.find((v) => /natural|neural/i.test(v.name) && !/male\b/i.test(v.name));
  if (natural) return natural;
  // Any voice with a feminine-sounding name/label
  const feminine = voices.find((v) => /female|woman/i.test(v.name));
  if (feminine) return feminine;
  // Any English voice at all
  return voices.find((v) => v.lang && v.lang.startsWith('en')) || voices[0] || null;
};

let cachedVoice = null;
let currentUtterance = null;

const speakText = async (text) => {
  if (!window.speechSynthesis) return null;
  speechSynthesis.cancel();
  if (!text || !text.trim()) return null;

  if (!cachedVoice) {
    const voices = await getVoicesAsync();
    cachedVoice = pickBestVoice(voices);
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  if (cachedVoice) utterance.voice = cachedVoice;

  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
  return utterance;
};

// Initialize read-aloud button on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if button already exists
  if (document.getElementById('global-read-aloud-btn')) return;

  // Create floating read-aloud button
  const btn = document.createElement('button');
  btn.id = 'global-read-aloud-btn';
  btn.type = 'button';
  btn.textContent = '🔊';
  btn.setAttribute('aria-label', 'Read page aloud');
  btn.title = 'Read page aloud (press to start/stop)';
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #2c2c85;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(44, 44, 133, 0.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  `;

  // Hover effect
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.boxShadow = '0 8px 24px rgba(44, 44, 133, 0.4)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 4px 16px rgba(44, 44, 133, 0.3)';
  });

  const resetButton = () => {
    btn.style.background = '#2c2c85';
    btn.setAttribute('aria-pressed', 'false');
  };

  // Read page content
  btn.addEventListener('click', async () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      resetButton();
      return;
    }

    // Get main content to read
    const mainContent = document.querySelector('main') || document.body;
    const text = mainContent.innerText;

    if (text.trim()) {
      btn.style.background = '#d56b91';
      btn.setAttribute('aria-pressed', 'true');
      const utterance = await speakText(text);
      if (!utterance) {
        resetButton();
        return;
      }
      utterance.onend = resetButton;
      utterance.onerror = resetButton;
    }
  });

  // Handle stop on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      resetButton();
    }
  });

  document.body.appendChild(btn);
});
