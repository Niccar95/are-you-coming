"use client";

import { ReactQRCode } from "@lglab/react-qr-code";

interface QRProps {
  spotifyInviteUrl: string | null;
}

const QRCode = ({ spotifyInviteUrl }: QRProps) => {
  return (
    <>
      {spotifyInviteUrl && (
        <ReactQRCode
          value={spotifyInviteUrl}
          size={180}
          background={{
            type: "linear",
            rotation: 45,
            stops: [
              { offset: "0%", color: "#ede9fe" },
              { offset: "100%", color: "#ddd6fe" },
            ],
          }}
        />
      )}
    </>
  );
};

export default QRCode;
