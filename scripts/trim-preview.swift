// Cuts a short preview (with fade in/out) from a full song using macOS AVFoundation.
// Usage: swift scripts/trim-preview.swift <input> <output.m4a> <startSeconds> <durationSeconds>
import AVFoundation

let args = CommandLine.arguments
guard args.count == 5, let start = Double(args[3]), let duration = Double(args[4]) else {
  print("usage: trim-preview.swift <input> <output.m4a> <start> <duration>"); exit(2)
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let fade = 2.5
let asset = AVURLAsset(url: input)
let total = CMTimeGetSeconds(asset.duration)
let d = min(duration, total)
let s = max(0, min(start, total - d))

guard let track = asset.tracks(withMediaType: .audio).first,
      let export = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetAppleM4A) else {
  print("cannot read audio: \(input.path)"); exit(1)
}
func t(_ x: Double) -> CMTime { CMTime(seconds: x, preferredTimescale: 44100) }
let range = CMTimeRange(start: t(s), duration: t(d))
let params = AVMutableAudioMixInputParameters(track: track)
if s > 0 {
  params.setVolumeRamp(fromStartVolume: 0, toEndVolume: 1, timeRange: CMTimeRange(start: t(s), duration: t(fade)))
}
params.setVolumeRamp(fromStartVolume: 1, toEndVolume: 0, timeRange: CMTimeRange(start: t(s + d - fade), duration: t(fade)))
let mix = AVMutableAudioMix()
mix.inputParameters = [params]

try? FileManager.default.removeItem(at: output)
export.outputURL = output
export.outputFileType = .m4a
export.timeRange = range
export.audioMix = mix
let done = DispatchSemaphore(value: 0)
export.exportAsynchronously { done.signal() }
done.wait()
if export.status != .completed { print("export failed: \(String(describing: export.error))"); exit(1) }
print(String(format: "ok  %@  (%.0fs from %.0fs)", output.lastPathComponent, d, s))
