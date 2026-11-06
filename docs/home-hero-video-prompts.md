# 홈 첫 장면 영상 · 생성 프롬프트 (급배수 · 가스기기)

작성 2026-11-06. 홈 첫 장면(`src/components/home/Hero.tsx` 의 `CLIPS`)은 스크롤로 넘기는 세 편입니다.
순서는 **급배수 → 사무용 의자 → 가스기기**. 사무용 의자는 기존 `aovo-brand-bg-web.mp4` 를 그대로 씁니다.

| 편 | 지금 쓰는 것 | 이 문서의 프롬프트로 바꿀 것 |
| --- | --- | --- |
| 급배수 | 현장 사진 `public/images/home/poster-water.jpg` (2023 롯데타워 크리스마스 마켓, 원본 `~/Documents/kimshop/급배수/2023 롯데타워 크리스마스 마켓 급배수/…014.jpeg`, 16:9 로 잘라 1920×1080) | 아래 A. 행사장 식음 부스에 물이 흐르는 낮 장면 |
| 가스기기 | 정지 사진 `public/images/home/poster-gas.jpg` (`facility/gas-rental-hero.webp` 를 16:9 로 잘라 1920×1080) | 아래 B. 천막 주방의 가스기기 줄에 불이 켜지는 장면 |

2026-11-06 사용자 결정: 크레딧이 없는 동안은 **사진으로 간다**. `/water` 영상을 앞뒤로 이어 붙였던 `hero-water-web.mp4` 는 저장소에서 뺐다(원본은 `~/Documents/Codex/2026-11-04/new-chat/outputs/water-d-setup-1080p.mp4`). 사진 편에도 `.home-clip` 의 느린 줌(1.02→1.06)이 걸리므로 따로 모션을 넣지 않았다.

생성 도구는 Higgsfield MCP 의 `generate_video`, 모델 `seedance_2_5`, mode `t2v`. 2026-11-06 확인 기준 5초 · 1080p · 16:9 · 무음 한 편에 **80크레딧**이고, 계정 잔액이 0(무료 플랜)이라 아직 돌리지 않았습니다. 크레딧을 채운 뒤 아래 프롬프트를 그대로 넣으면 됩니다.

## 공통 규격

- 16:9, 1920×1080, 5초, 24fps, 무음. 카메라는 느린 돌리 하나, 컷 없음.
- **루프 재생**됩니다. 시작과 끝이 비슷한 상태(같은 조명, 같은 자리)여야 이음새가 덜 보입니다. 아침→밤처럼 한쪽으로 가는 변화는 쓰지 않습니다.
- 첫 프레임이 곧 포스터입니다(스크롤 전 화면). 첫 프레임부터 장비가 다 서 있어야 합니다.
- 글자·로고·자막 없음. 사람은 뒷모습이나 멀리 작게, 얼굴 없음. 네이비 작업복·흰 헬멧(사이트 다른 사진과 같은 차림).
- 글이 왼쪽 아래에 얹히므로 왼쪽 아래 1/3 은 어둡거나 단순하게.

## A. 급배수 «물이 나오는 부스»

```
Photoreal website hero footage, 16:9, 1920x1080, 5 seconds, silent, one slow steady dolly from left to
right, no cuts, no zoom. Daytime at an outdoor festival food court on a green lawn in Korea: a row of
white 3x3 m pop-up canopy tents, under each a freestanding stainless-steel utility sink. Beside the
nearest tent a ribbed blue 1-ton polyethylene water tank stands on a wooden pallet with a compact grey
pump at its foot; a blue flexible supply hose runs from the tank over the grass into the tent and a grey
drain hose runs back out. Clear water runs steadily from the chrome faucet into the sink the whole time.
One worker in navy work clothes and a white helmet, seen from behind at mid distance, checks the hose.
Soft bright overcast light, calm documentary look, natural colors, high detail, consistent lighting from
first frame to last so the clip loops cleanly. The lower-left third of the frame stays simple (grass and
shadow) for overlaid text. No text, no logos, no signage, no faces, no flicker.
```

네거티브: `camera cuts, zoom, pan, flicker, text, watermark, logo, subtitles, faces, crowd, cartoon, oversaturated, extra tanks, floating hose, rain, night`

## B. 가스기기 «불이 켜지는 주방»

```
Photoreal website hero footage, 16:9, 1920x1080, 5 seconds, silent, one slow steady dolly along the
line of equipment, no cuts, no zoom. A temporary outdoor event kitchen under a large white canopy on a
paved lot in Korea: a row of commercial stainless-steel gas appliances on wheels - a long low gas range
with six cast-iron burners, a single wok burner, a tilting kettle (large stainless soup pot on a frame),
a flat griddle and a deep fryer - connected by yellow LPG hoses to a gas manifold. Blue flames burn
evenly on the burners from the first frame; the kettle gives off a little steam; heat shimmer over the
griddle. One worker in navy work clothes and a white helmet, seen from behind, kneels at the manifold
checking a valve. Bright soft daylight from outside the tent, cool clean stainless highlights, natural
colors, high detail, consistent lighting first frame to last so the clip loops cleanly. The lower-left
third of the frame stays simple (floor and shadow) for overlaid text. No text, no logos, no signage,
no faces, no flicker, no open fire beyond the burners.
```

네거티브: `camera cuts, zoom, pan, flicker, text, watermark, logo, subtitles, faces, crowd, cartoon, oversaturated, fire hazard, smoke, explosion, melted shapes, extra burners`

## 호출 예 (Higgsfield MCP)

```json
{
  "model": "seedance_2_5",
  "mode": "t2v",
  "duration": 5,
  "resolution": "1080p",
  "aspect_ratio": "16:9",
  "generate_audio": false,
  "bitrate_mode": "high",
  "count": 1,
  "prompt": "<위 A 또는 B>"
}
```

`get_cost: true` 를 먼저 넣어 크레딧을 확인합니다.

## 적용 절차

1. 생성한 mp4 는 저장소 밖(`~/Documents/Codex/<날짜>/outputs/`)에 원본으로 둡니다.
2. 웹용으로 다시 인코딩하고 첫 프레임을 포스터로 뽑습니다.
   ```bash
   ffmpeg -i 원본.mp4 -an -c:v libx264 -preset slow -crf 20 -movflags +faststart -r 24 public/images/hero-gas-web.mp4
   ffmpeg -i public/images/hero-gas-web.mp4 -frames:v 1 -q:v 3 public/images/home/poster-gas.jpg
   ```
   루프 이음새가 거슬리면 급배수처럼 앞뒤로 이어 붙입니다.
   ```bash
   ffmpeg -i 원본.mp4 -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 20 -movflags +faststart -r 24 public/images/hero-gas-web.mp4
   ```
3. `Hero.tsx` 의 `CLIPS` 에서 가스기기 편에 `src: "/images/hero-gas-web.mp4"` 를 넣습니다(급배수도 새 영상으로 바꾸면 같은 방식).
4. 원본 mp4 는 커밋하지 않습니다. `-web.mp4` 와 포스터만 저장소에 둡니다.
