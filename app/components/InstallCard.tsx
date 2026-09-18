"use client";

import { CheckCircle2, Download } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BeforeInstallPromptEvent,
  getGlobalPrompt,
  setGlobalPrompt,
  wasInstallable,
} from "../utils/globalPrompt";

const InstallCard = () => {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (wasInstallable()) {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setGlobalPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const deferredPrompt = getGlobalPrompt();
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setGlobalPrompt(null);
      setIsInstallable(false);

      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  return (
    <div className="card flex flex-col gap-3 mt-12">
      {isInstallable ? (
        <>
          <p className="text-subtitle font-semibold">Install App</p>
          <p className="text-body">
            Install <b>Are You Coming?</b> for a faster, dedicated desktop
            experience.
          </p>
          <button
            type="button"
            className="btn-primary flex items-center justify-center gap-3"
            onClick={handleInstallClick}
          >
            <Download size={16} />
            Install Application
          </button>
        </>
      ) : (
        <>
          <p className="text-subtitle font-semibold">App Installed!</p>
          <p className="text-body">
            You are running the desktop version or installation is not
            available.
          </p>
          <button
            type="button"
            className="flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium rounded-md bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 opacity-60 cursor-not-allowed"
            disabled
          >
            <CheckCircle2 size={16} className="text-violet-500" />
            Installed
          </button>
        </>
      )}
    </div>
  );
};

export default InstallCard;
