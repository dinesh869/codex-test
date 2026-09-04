import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const COLORS = {
  ink: '#1F2937',
  sky: '#DDF3FF',
  sand: '#F6E6B8',
  coral: '#F58E8E',
  cream: '#FFF8E7',
  teal: '#4FB7A6',
  blue: '#5D8EDB',
  yellow: '#F4C95D',
  brown: '#8A5E3B',
  skin: '#D7A27D',
  darkSkin: '#9A6644',
  green: '#7BBF6A',
  white: '#FFFFFF',
};

const Character: React.FC<{
  x: number;
  y: number;
  shirt: string;
  skin?: string;
  scale?: number;
  flip?: boolean;
}> = ({x, y, shirt, skin = COLORS.skin, scale = 1, flip = false}) => (
  <svg
    width={170 * scale}
    height={300 * scale}
    viewBox="0 0 170 300"
    style={{position: 'absolute', left: x, top: y, transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: 'center'}}
  >
    <ellipse cx="85" cy="276" rx="48" ry="10" fill="#000" opacity="0.08" />
    <circle cx="85" cy="52" r="34" fill={skin} />
    <path d="M52 49c4-29 56-37 70 0-8-13-21-18-34-18-16 0-27 6-36 18Z" fill={COLORS.ink} />
    <rect x="55" y="87" width="60" height="92" rx="24" fill={shirt} />
    <rect x="35" y="98" width="24" height="92" rx="12" fill={skin} transform="rotate(8 35 98)" />
    <rect x="111" y="98" width="24" height="92" rx="12" fill={skin} transform="rotate(-8 111 98)" />
    <rect x="58" y="171" width="22" height="92" rx="11" fill={COLORS.ink} />
    <rect x="91" y="171" width="22" height="92" rx="11" fill={COLORS.ink} />
    <path d="M52 87h66l-8 24H60Z" fill={COLORS.white} opacity="0.25" />
  </svg>
);

const Shop: React.FC = () => (
  <svg width="760" height="700" viewBox="0 0 760 700" style={{position: 'absolute', left: 160, top: 360}}>
    <ellipse cx="380" cy="640" rx="300" ry="24" fill="#000" opacity="0.08" />
    <rect x="110" y="210" width="540" height="390" rx="24" fill={COLORS.cream} stroke={COLORS.ink} strokeWidth="8" />
    <path d="M85 210h590l-48-105H133Z" fill={COLORS.coral} stroke={COLORS.ink} strokeWidth="8" strokeLinejoin="round" />
    <path d="M133 105h494" stroke={COLORS.ink} strokeWidth="8" />
    <rect x="250" y="245" width="260" height="110" rx="22" fill={COLORS.white} stroke={COLORS.ink} strokeWidth="7" />
    <text x="380" y="312" textAnchor="middle" fontSize="42" fontWeight="800" fontFamily="Arial, sans-serif" fill={COLORS.ink}>BEACH SCOOPS</text>
    <rect x="170" y="400" width="420" height="150" rx="18" fill="#C8E9F5" stroke={COLORS.ink} strokeWidth="8" />
    <path d="M170 462h420" stroke={COLORS.ink} strokeWidth="7" />
    <circle cx="248" cy="440" r="26" fill="#F4B6C2" />
    <circle cx="326" cy="440" r="26" fill="#B7D5F5" />
    <circle cx="404" cy="440" r="26" fill="#F6D47A" />
    <circle cx="482" cy="440" r="26" fill="#9ED8C5" />
    <path d="M230 468l18 38 18-38M308 468l18 38 18-38M386 468l18 38 18-38M464 468l18 38 18-38" fill="none" stroke={COLORS.brown} strokeWidth="8" strokeLinecap="round" />
    <rect x="95" y="550" width="570" height="38" rx="19" fill={COLORS.brown} stroke={COLORS.ink} strokeWidth="7" />
  </svg>
);

const Palm: React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1}) => (
  <svg width={260*scale} height={420*scale} viewBox="0 0 260 420" style={{position:'absolute',left:x,top:y}}>
    <path d="M132 400C150 312 150 221 125 139" fill="none" stroke="#9B6A43" strokeWidth="28" strokeLinecap="round" />
    <path d="M128 143C73 88 20 94 0 121c58-6 96 17 128 22ZM132 141c51-63 110-53 128-21-57-6-94 4-128 21ZM127 140C82 75 99 23 128 0c21 50 18 98-1 140ZM130 143c40-57 91-64 117-42-45 8-79 21-117 42Z" fill={COLORS.green} />
  </svg>
);

export const FlatShop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleY = interpolate(frame, [0, 22], [-80, 0], {extrapolateRight: 'clamp'});
  const titleOpacity = interpolate(frame, [0, 18, 55, 75], [0, 1, 1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});

  const c1 = spring({frame: frame - 55, fps, config:{damping:15, stiffness:85}});
  const c2 = spring({frame: frame - 105, fps, config:{damping:15, stiffness:85}});
  const c3 = spring({frame: frame - 155, fps, config:{damping:15, stiffness:85}});

  const x1 = interpolate(c1, [0,1], [1120, 760], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const x2 = interpolate(c2, [0,1], [-200, 165], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const x3 = interpolate(c3, [0,1], [1120, 810], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});

  const stock = frame < 75 ? 20 : frame < 125 ? 16 : frame < 175 ? 11 : frame < 225 ? 5 : 0;
  const endOpacity = interpolate(frame, [225, 255], [0,1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.sky, overflow:'hidden', fontFamily:'Arial, sans-serif'}}>
      <div style={{position:'absolute', top:0, left:0, right:0, height:890, background:'linear-gradient(#DDF3FF,#EEF9FF)'}} />
      <div style={{position:'absolute', top:890, left:0, right:0, bottom:0, backgroundColor:COLORS.sand}} />
      <div style={{position:'absolute', top:820, left:0, right:0, height:110, backgroundColor:'#B8E0F2', borderTop:`7px solid ${COLORS.ink}`}} />
      <div style={{position:'absolute', top:858, left:0, right:0, height:18, backgroundColor:COLORS.white, opacity:0.8}} />
      <div style={{position:'absolute', width:120, height:120, borderRadius:'50%', backgroundColor:COLORS.yellow, top:115, right:115, boxShadow:'0 0 0 18px rgba(244,201,93,0.15)'}} />

      <Palm x={-45} y={430} scale={0.86} />
      <Palm x={865} y={520} scale={0.72} />
      <Shop />

      <div style={{position:'absolute', top:100, left:80, right:80, textAlign:'center', transform:`translateY(${titleY}px)`, opacity:titleOpacity}}>
        <div style={{fontSize:68, fontWeight:900, color:COLORS.ink, letterSpacing:-2}}>How much ice cream should he stock?</div>
        <div style={{fontSize:34, marginTop:16, color:'#4B5563'}}>A simple newsvendor story</div>
      </div>

      <Character x={445} y={710} shirt={COLORS.teal} scale={1.05} />
      <Character x={x1} y={1115} shirt={COLORS.blue} scale={0.95} flip />
      <Character x={x2} y={1195} shirt={COLORS.coral} skin={COLORS.darkSkin} scale={0.92} />
      <Character x={x3} y={1325} shirt={COLORS.yellow} scale={0.9} flip />

      <div style={{position:'absolute', left:90, right:90, bottom:120, backgroundColor:'rgba(255,255,255,0.94)', border:`6px solid ${COLORS.ink}`, borderRadius:34, padding:'28px 34px', boxShadow:'0 18px 0 rgba(31,41,55,0.08)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:28, color:'#6B7280', fontWeight:700}}>ICE CREAMS LEFT</div>
            <div style={{fontSize:78, lineHeight:1, color:stock===0?'#D64545':COLORS.ink, fontWeight:900}}>{stock}</div>
          </div>
          <div style={{width:500, fontSize:32, lineHeight:1.28, color:COLORS.ink, fontWeight:700}}>
            {stock > 0 ? 'Customers keep arriving. Every sale reduces today’s stock.' : 'Sold out. More customers arrive, but there is nothing left to sell.'}
          </div>
        </div>
      </div>

      <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(31,41,55,0.72)', opacity:endOpacity, pointerEvents:'none'}}>
        <div style={{width:860, backgroundColor:COLORS.cream, border:`8px solid ${COLORS.ink}`, borderRadius:42, padding:'58px 60px', textAlign:'center', boxShadow:'0 24px 0 rgba(0,0,0,0.14)'}}>
          <div style={{fontSize:42, color:COLORS.coral, fontWeight:900, marginBottom:16}}>THE TRADE-OFF</div>
          <div style={{fontSize:58, lineHeight:1.12, color:COLORS.ink, fontWeight:900}}>Too much stock wastes money.<br/>Too little stock loses sales.</div>
          <div style={{fontSize:34, color:'#4B5563', marginTop:28}}>The newsvendor problem finds the balance.</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
