function n(x: string) {
  const v = Number((x ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(v) ? v : NaN;
}

// ----- Factor tables (ordered logic) -----
function vldlSizeFactor(sizeNm: number) {
  if (sizeNm < 39.2) return 0;
  if (sizeNm <= 41.1) return 1;
  if (sizeNm <= 42.8) return 2;
  if (sizeNm <= 44.3) return 4;
  if (sizeNm <= 46.0) return 6;
  if (sizeNm <= 48.1) return 9;
  if (sizeNm <= 50.3) return 10;
  if (sizeNm <= 51.6) return 11;
  if (sizeNm <= 53.2) return 12;
  if (sizeNm <= 55.3) return 15;
  if (sizeNm <= 58.4) return 18;
  if (sizeNm <= 61.0) return 19;
  if (sizeNm <= 63.0) return 22;
  if (sizeNm <= 64.1) return 25;
  if (sizeNm <= 65.1) return 28;
  return 32;
}

function vldlPFactor(largeVldlP_nmolL: number) {
  if (largeVldlP_nmolL < 0.7) return 0;
  if (largeVldlP_nmolL <= 1.0) return 2;
  if (largeVldlP_nmolL <= 1.3) return 5;
  if (largeVldlP_nmolL <= 1.5) return 7;
  if (largeVldlP_nmolL <= 1.7) return 9;
  if (largeVldlP_nmolL <= 2.5) return 12;
  if (largeVldlP_nmolL <= 3.7) return 15;
  if (largeVldlP_nmolL <= 5.3) return 18;
  if (largeVldlP_nmolL <= 7.9) return 19;
  return 22;
}

function ldlSizeFactor(sizeNm: number) {
  if (sizeNm < 21) return 6;
  if (sizeNm <= 21) return 5;
  if (sizeNm <= 21.1) return 3;
  if (sizeNm <= 21.2) return 2;
  return 0;
}

function smallLdlPFactor(smallLdlP_nmolL: number) {
  if (smallLdlP_nmolL < 90) return 0;
  if (smallLdlP_nmolL <= 104) return 1;
  if (smallLdlP_nmolL <= 128) return 3;
  if (smallLdlP_nmolL <= 372) return 4;
  if (smallLdlP_nmolL <= 961) return 6;
  return 8;
}

function hdlSizeFactor(sizeNm: number) {
  if (sizeNm < 8.7) return 20;
  if (sizeNm <= 8.7) return 16;
  if (sizeNm <= 8.8) return 12;
  if (sizeNm <= 8.9) return 10;
  if (sizeNm <= 9.0) return 9;
  if (sizeNm <= 9.2) return 7;
  if (sizeNm <= 9.3) return 5;
  if (sizeNm <= 9.5) return 4;
  if (sizeNm <= 9.7) return 2;
  return 0;
}

function largeHdlPFactor(largeHdlP_mcmolL: number) {
  if (largeHdlP_mcmolL < 3.1) return 12;
  if (largeHdlP_mcmolL <= 4.0) return 10;
  if (largeHdlP_mcmolL <= 5.4) return 9;
  if (largeHdlP_mcmolL <= 6.3) return 8;
  if (largeHdlP_mcmolL <= 7.1) return 6;
  if (largeHdlP_mcmolL <= 8.0) return 4;
  if (largeHdlP_mcmolL <= 9.3) return 2;
  return 0;
}

export function computeLpir({
  vldlSize,
  largeVldlP,
  ldlSize,
  smallLdlP,
  hdlSize,
  largeHdlP,
}: {
  vldlSize: string; // nm
  largeVldlP: string; // nmol/L
  ldlSize: string; // nm
  smallLdlP: string; // nmol/L
  hdlSize: string; // nm
  largeHdlP: string; // mcmol/L
}) {
  const vldlSizeN = n(vldlSize);
  const largeVldlPN = n(largeVldlP);
  const ldlSizeN = n(ldlSize);
  const smallLdlPN = n(smallLdlP);
  const hdlSizeN = n(hdlSize);
  const largeHdlPN = n(largeHdlP);

  const complete = [
    vldlSizeN,
    largeVldlPN,
    ldlSizeN,
    smallLdlPN,
    hdlSizeN,
    largeHdlPN,
  ].every((x) => Number.isFinite(x));

  if (!complete) {
    return {
      complete: false as const,
      lpir: null as number | null,
      factors: null as {
        vldlSize: number;
        vldlP: number;
        ldlSize: number;
        smallLdlP: number;
        hdlSize: number;
        largeHdlP: number;
      } | null,
    };
  }

  const f = {
    vldlSize: vldlSizeFactor(vldlSizeN),
    vldlP: vldlPFactor(largeVldlPN),
    ldlSize: ldlSizeFactor(ldlSizeN),
    smallLdlP: smallLdlPFactor(smallLdlPN),
    hdlSize: hdlSizeFactor(hdlSizeN),
    largeHdlP: largeHdlPFactor(largeHdlPN),
  };

  const lpir =
    f.vldlSize + f.vldlP + f.ldlSize + f.smallLdlP + f.hdlSize + f.largeHdlP;

  return { complete: true as const, lpir, factors: f };
}
