import React from "react";
import { Composition } from "remotion";
import { Main } from "./Main";
import { MainClaude } from "./MainClaude";
import { DURATION_FRAMES, FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
  <Composition
    id="Novedades"
    component={Main}
    durationInFrames={DURATION_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
    <Composition id="NovedadesClaude" component={MainClaude} durationInFrames={588} fps={FPS} width={1080} height={1920} />
  </>
);
