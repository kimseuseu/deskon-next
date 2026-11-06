import { COMPANY } from "@/lib/constants";

/**
 * 브라우저에서 Cloudinary 로 바로 올립니다(서명 없는 업로드 프리셋).
 * 프리셋 이름은 constants.ts 의 cloudinary.preset 입니다. Cloudinary 콘솔에서
 * Settings → Upload → Upload presets 에 같은 이름의 "Unsigned" 프리셋이 있어야 합니다.
 */
export async function uploadImage(file: File, folder = "blog"): Promise<{ url: string; width: number; height: number }> {
  const { cloudName, preset } = COMPANY.cloudinary;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);
  form.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
  const json = (await res.json().catch(() => ({}))) as {
    secure_url?: string;
    width?: number;
    height?: number;
    error?: { message?: string };
  };
  if (!res.ok || !json.secure_url) {
    throw new Error(json.error?.message ?? `업로드 실패 (${res.status})`);
  }
  /* f_auto,q_auto 변환을 주소에 끼워 넣어 브라우저에 맞는 형식과 화질로 받습니다. */
  const url = json.secure_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
  return { url, width: json.width ?? 0, height: json.height ?? 0 };
}
