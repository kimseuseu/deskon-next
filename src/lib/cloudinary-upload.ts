import { COMPANY } from "@/lib/constants";

export interface UploadedImage {
  url: string;
  width: number;
  height: number;
}

/**
 * 브라우저에서 Cloudinary 로 바로 올립니다(서명 없는 업로드 프리셋).
 * 프리셋 이름은 constants.ts 의 cloudinary.preset 입니다. Cloudinary 콘솔에서
 * Settings → Upload → Upload presets 에 같은 이름의 "Unsigned" 프리셋이 있어야 합니다.
 *
 * onProgress 를 주면 0~1 사이 진행률을 받습니다(XMLHttpRequest 의 upload 이벤트).
 * 폴더는 프리셋이 "Use filename or externally defined public ID / folder" 를 허용해야 반영됩니다.
 */
export function uploadImage(
  file: File,
  folder = "blog",
  onProgress?: (fraction: number) => void
): Promise<UploadedImage> {
  const { cloudName, preset } = COMPANY.cloudinary;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);
  form.append("folder", folder);

  return new Promise<UploadedImage>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
    xhr.responseType = "json";

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.min(1, e.loaded / e.total));
      };
    }

    xhr.onerror = () => reject(new Error("네트워크 오류로 올리지 못했습니다."));
    xhr.onabort = () => reject(new Error("업로드가 취소되었습니다."));
    xhr.onload = () => {
      const json = (xhr.response ?? {}) as {
        secure_url?: string;
        width?: number;
        height?: number;
        error?: { message?: string };
      };
      if (xhr.status < 200 || xhr.status >= 300 || !json.secure_url) {
        reject(new Error(json.error?.message ?? `업로드 실패 (${xhr.status})`));
        return;
      }
      onProgress?.(1);
      /* f_auto,q_auto 변환을 주소에 끼워 넣어 브라우저에 맞는 형식과 화질로 받습니다. */
      const url = json.secure_url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
      resolve({ url, width: json.width ?? 0, height: json.height ?? 0 });
    };

    xhr.send(form);
  });
}
