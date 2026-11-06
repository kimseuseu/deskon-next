# /water 첫 장면 영상 D «세우는 날» · 생성 프롬프트

작성 2026-11-06. 맺음 앞 스크럽 ③ «걷어 가는 날»(영상 C, `public/seq/sinks`)이 밤에서 아침으로
가는 것처럼, 첫 장면은 **같은 자리에서 아침에서 밤으로** 갑니다. 빈 잔디에 천막이 서고 물탱크가
들어오고 호스가 깔린 뒤, 해가 지고 천막에 불이 켜집니다. 스크롤이 곧 하루입니다.

영상 C의 첫 프레임(`public/seq/sinks/f_001.webp`, 밤의 천막)이 이 영상의 **마지막 프레임**과
같아야 페이지가 앞뒤로 맞물립니다. 끝 프레임을 지정할 수 있는 도구(Kling, Luma, Veo 등)에서는
그 파일을 end frame으로 넣으세요.

## 규격
- 16:9, 1280×720 이상, 4~5초, 24fps. 카메라 고정(locked-off), 컷 없음.
- 첫 프레임은 그 자체로 포스터입니다. 스크롤 전 화면에 멈춰 있으므로, 아침의 빈 잔디가 깨끗해야 합니다.
- 글자·로고·자막 없음. 사람 얼굴 없음(멀리서 작게).

## 메인 프롬프트 (영문)

```
Static locked-off wide shot, 16:9, photoreal documentary look, natural colors.
A flat green lawn at an outdoor event venue in Korea (golf course park), a tree line, park lamp posts
and a paved path in the background. One continuous time-lapse from early morning to night, no cuts,
camera never moves.

0-20%: soft early-morning light, empty lawn, long shadows, light mist over the grass.
20-50%: two workers in navy work clothes raise a white 3x3 m pop-up canopy tent (white fabric,
aluminium frame). A forklift lowers a round blue 1-ton plastic water tank onto a wooden pallet
beside the tent. A small grey electric pump is set at the foot of the tank. A blue flexible hose runs
from the tank into the tent to a stainless-steel sink; a black drain hose runs from the sink back
beside the tank. Shadows shorten toward noon.
50-75%: afternoon, warm light, the workers walk away. The sun lowers to the tree line; the sky turns
orange, then violet.
75-100%: dusk to night. Work lights under the tent and the park lamps switch on, the tent glows white
from inside, the blue tank, pump and sink are lit by the tent light, water runs from the sink tap.
Final frame: deep blue night sky, lit white tent, blue tank on pallet, sink and pump, exactly like the
reference night frame.

Smooth light change without flicker. Workers are small distant figures, no faces. No text, no logos,
no signage, no captions. Slightly cool blue night, clean high-detail image.
```

네거티브(쓸 수 있는 도구에서):

```
camera movement, zoom, pan, cuts, flicker, strobing, text, watermark, logo, subtitles, lens flare,
people close-up, faces, crowd, cars in foreground, cartoon, illustration, oversaturated,
distorted tank, extra tents, extra tanks, rain
```

## 짧은 버전 (글자 수 제한이 있는 도구용)

```
Locked-off wide shot, photoreal time-lapse, morning to night, one take, no cuts. Green lawn at a
Korean outdoor event venue, tree line behind. Empty lawn at dawn; workers raise a white 3x3 m
pop-up canopy tent; a forklift sets a round blue 1-ton water tank on a wooden pallet beside it; a
blue hose runs to a stainless sink under the tent; sun sets, sky goes orange to violet; tent lights
and park lamps turn on, tent glows white, water runs from the sink. End on deep blue night with the
lit tent, blue tank, sink. No text, no logos, no faces, no flicker.
```

## 한글 요약 (한글 입력 도구용)

```
고정 카메라 와이드샷, 실사 타임랩스, 아침에서 밤까지 한 컷. 한국 야외 행사장 잔디밭, 뒤로 나무와
가로등. 새벽 빈 잔디 → 작업자 둘이 흰 3×3 캐노피 천막을 세움 → 지게차가 파란 1톤 원형 물탱크를
나무 파렛트 위에 내려놓음 → 탱크 밑에 작은 펌프, 파란 호스가 천막 안 스테인리스 싱크대로 이어짐
→ 해가 지며 하늘이 주황·보라로 → 천막 안 작업등과 가로등이 켜지고 천막이 하얗게 빛남, 싱크대에서
물이 나옴. 마지막은 짙은 남색 밤하늘과 불 켜진 천막, 파란 탱크, 싱크대. 글자·로고·얼굴·깜빡임 없음.
```

## 생성 결과 (2026-11-06)
Seedance 2.5, omni_reference(start = 빈 잔디 아침 포스터, end = `public/seq/sinks/f_001.webp`), 1080p, 5초, 121장.
원본과 생성 기록은 `~/Documents/Codex/2026-11-04/new-chat/outputs/water-d-setup-1080p.mp4`, 같은 폴더의
`water-d-generation.json`. 같은 날 A·B·C도 1080p로 다시 만들었습니다(`…/outputs/water-realistic-1080p/`).
불은 102~108장(진행도 0.87)에서 켜집니다. 원본 mp4는 저장소에 두지 않습니다(프레임만 `public/seq/`).

## 적용 절차 (다시 만들 때)
1. 생성한 mp4를 Codex 출력 폴더처럼 저장소 밖에 둡니다.
2. 프레임을 뽑습니다(ffmpeg에 libwebp가 없으면 png로 뽑고 cwebp로 바꿉니다).
   ```bash
   # lg(넓은 화면)와 sm(좁은 화면) 두 벌. 4K 원본이면 lg는 2560:1440 q48로.
   mkdir -p /tmp/lg /tmp/sm && ffmpeg -i water-d-setup.mp4 -vf "scale=1920:1080" -start_number 1 /tmp/lg/f_%03d.png && ffmpeg -i water-d-setup.mp4 -vf "scale=1280:720" -start_number 1 /tmp/sm/f_%03d.png
   rm -rf public/seq/setup/lg public/seq/setup/sm && mkdir -p public/seq/setup/lg public/seq/setup/sm
   for f in /tmp/lg/*.png; do cwebp -quiet -q 50 "$f" -o "public/seq/setup/lg/$(basename "${f%.png}").webp"; done
   for f in /tmp/sm/*.png; do cwebp -quiet -q 56 "$f" -o "public/seq/setup/sm/$(basename "${f%.png}").webp"; done
   ```
3. `src/data/water-story.ts`의 `waterHero.count`를 장 수로, `clock.labels`의 둘째 값(라벨이 «행사 중»으로
   바뀌는 진행도)을 불이 켜지는 지점으로 맞춥니다.
4. `WaterHero.tsx`의 `DAY_END`(프레임이 끝나는 진행도)와 논지 구간은 밤이 시작되는 지점에 맞춥니다.

## 검수
- 첫 프레임이 포스터로 쓸 만한가(빈 잔디, 깨끗한 아침).
- 마지막 프레임이 `public/seq/sinks/f_001.webp`와 같은 자리·같은 장비로 보이는가.
- 탱크 한 통, 천막 한 동. 글자·로고 없음. 하늘이 깜빡이지 않음.
