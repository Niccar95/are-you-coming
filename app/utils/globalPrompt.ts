export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const setGlobalPrompt = (e: BeforeInstallPromptEvent | null) => {
  deferredPrompt = e;
};

export const getGlobalPrompt = () => deferredPrompt;

export const wasInstallable = () => deferredPrompt !== null;
