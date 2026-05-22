import React, { useState, useRef } from 'react';
import { Play, Volume2 } from 'lucide-react';
const RELEASES = [
{ id: 'IMP-001', title: 'burden', date: '2026.05.22' },
{ id: 'IMP-002', title: 'silence', date: '2026.05.22' },
{ id: 'IMP-003', title: 'I’ve moved', date: '2026.05.22' },
{ id: 'IMP-004', title: 'remember', date: '2026.05.22' },
{ id: 'IMP-005', title: 'go on', date: '2026.05.22' },
{ id: 'IMP-006', title: 'six more', date: '2026.05.22' },
];
export default function App() {
const [expandedIds, setExpandedIds] = useState({});
const [isPlaying, setIsPlaying] = useState({});
const [muted, setMuted] = useState(false);
const [progress, setProgress] = useState({});
const videoRefs = useRef({});
const toggleExpand = (id) => {
const isNowExpanded = !expandedIds[id];
setExpandedIds(prev => ({ ...prev, [id]: isNowExpanded }));
if (isNowExpanded) {
setTimeout(() => {
videoRefs.current[id]?.play();
setIsPlaying(prev => ({ ...prev, [id]: true }));
}, 100);
} else {
videoRefs.current[id]?.pause();
setIsPlaying(prev => ({ ...prev, [id]: false }));
}
};
const updateProgress = (e, id) => {
const video = e.target;
setProgress(prev => ({ ...prev, [id]: (video.currentTime / video.duration) * 100 }));
};
const handleSeek = (e, id) => {
const video = videoRefs.current[id];
const rect = e.target.getBoundingClientRect();
const x = e.clientX - rect.left;
const percentage = x / rect.width;
video.currentTime = percentage * video.duration;
setProgress(prev => ({ ...prev, [id]: percentage * 100 }));
};
const handleVideoClick = (id) => {
const video = videoRefs.current[id];
if (video.paused) {
video.play();
setIsPlaying(prev => ({ ...prev, [id]: true }));
} else {
video.pause();
setIsPlaying(prev => ({ ...prev, [id]: false }));
}
};
return (
<div className="min-h-screen bg-[#88786f] text-black font-sans flex flex-col selection:bg-[#E63946] selection:text-white">
<header className="p-6 text-[13px]">
<span className="font-medium tracking-tight text-black">impflanguage</span>
</header>
<main className="flex-1 flex flex-col items-center w-full px-6 pt-12 pb-24">
<div className="w-full max-w-[600px] flex flex-col">
{RELEASES.map((item) => (
<div key={item.id} className="flex flex-col mb-6">
<button
onClick={() => toggleExpand(item.id)}
className="flex flex-col items-start gap-0 group text-left py-1"
>
<span className="text-[10px] text-black/50 font-mono tracking-widest uppercase leading-none">
{item.date}
</span>
<span className={text-[14px] font-medium tracking-tight transition-all duration-300 leading-tight ${ expandedIds[item.id]  ? 'text-black underline underline-offset-4 decoration-[0.5px]'  : 'text-black/50 hover:text-black' }}>
{item.title}
</span>
</button>
<div
className={grid transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${ expandedIds[item.id]  ? 'grid-rows-[1fr] opacity-100 mt-3 duration-[800ms]'  : 'grid-rows-[0fr] opacity-0 duration-[500ms]' }}
>
<div className="overflow-hidden">
<div
className="w-full aspect-video bg-black flex items-center justify-center border border-black/10 overflow-hidden relative cursor-pointer"
onClick={() => handleVideoClick(item.id)}
>
<video
ref={(el) => (videoRefs.current[item.id] = el)}
className="w-full h-full object-cover"
playsInline
muted={muted}
onPlay={() => setIsPlaying(prev => ({ ...prev, [item.id]: true }))}
onPause={() => setIsPlaying(prev => ({ ...prev, [item.id]: false }))}
onTimeUpdate={(e) => updateProgress(e, item.id)}
>
<source src="Www.mp4" type="video/mp4" />
</video>
{!isPlaying[item.id] && (
<div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
<Play size={48} className="text-white fill-white" strokeWidth={1} />
</div>
)}
<div className="absolute bottom-3 right-3 z-20">
<button
onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
className="hover:opacity-70 transition-opacity duration-200 relative p-1"
>
<Volume2 size={16} className="text-white" strokeWidth={2} />
{muted && (
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div className="w-[10px] h-[1.5px] bg-white rotate-45"></div>
</div>
)}
</button>
</div>
<div
className="absolute bottom-0 left-0 w-full h-[4px] bg-white/20 cursor-pointer z-10"
onClick={(e) => { e.stopPropagation(); handleSeek(e, item.id); }}
>
<div
className="h-full bg-white transition-all duration-75 ease-linear"
style={{ width: ${progress[item.id] || 0}% }}
></div>
</div>
</div>
</div>
</div>
</div>
))}
</div>
</main>
<footer className="p-6 text-[11px] text-black/50">
© {new Date().getFullYear()} impflanguage
</footer>
</div>
);
}
### File 2: package.json
Copy everything between the lines below:
{
"name": "impflanguage",
"version": "1.0.0",
"dependencies": {
"react": "^18.0.0",
"react-dom": "^18.0.0",
"lucide-react": "latest"
}
}
