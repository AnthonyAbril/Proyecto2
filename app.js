import * as Tone from "https://cdn.jsdelivr.net/npm/tone";

document.getElementById("midi-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const midi = new Midi(arrayBuffer);

  // Convert MIDI tracks to Tone.js Parts
  const parts = midi.tracks.map(track => {
    return new Tone.Part((time, note) => {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, track.notes);
  });

  document.getElementById("play-button").disabled = false;

  document.getElementById("play-button").addEventListener("click", () => {
    Tone.Transport.start();
    parts.forEach(part => part.start(0));
  });
});
