import type { TemplateResult } from 'lit';

import {
  DarkLoadingIcon,
  EmbedCardDarkBannerIcon,
  EmbedCardDarkCubeIcon,
  EmbedCardDarkHorizontalIcon,
  EmbedCardDarkListIcon,
  EmbedCardDarkVerticalIcon,
  EmbedCardLightBannerIcon,
  EmbedCardLightCubeIcon,
  EmbedCardLightHorizontalIcon,
  EmbedCardLightListIcon,
  EmbedCardLightVerticalIcon,
  LightLoadingIcon,
} from '@algogrind/affine-components/icons';
import { ThemeObserver } from '@algogrind/affine-shared/theme';

type EmbedCardIcons = {
  LoadingIcon: TemplateResult<1>;
  EmbedCardBannerIcon: TemplateResult<1>;
  EmbedCardHorizontalIcon: TemplateResult<1>;
  EmbedCardListIcon: TemplateResult<1>;
  EmbedCardVerticalIcon: TemplateResult<1>;
  EmbedCardCubeIcon: TemplateResult<1>;
};

export function getEmbedCardIcons(): EmbedCardIcons {
  const theme = ThemeObserver.mode;
  if (theme === 'light') {
    return {
      LoadingIcon: LightLoadingIcon,
      EmbedCardBannerIcon: EmbedCardLightBannerIcon,
      EmbedCardHorizontalIcon: EmbedCardLightHorizontalIcon,
      EmbedCardListIcon: EmbedCardLightListIcon,
      EmbedCardVerticalIcon: EmbedCardLightVerticalIcon,
      EmbedCardCubeIcon: EmbedCardLightCubeIcon,
    };
  } else {
    return {
      LoadingIcon: DarkLoadingIcon,
      EmbedCardBannerIcon: EmbedCardDarkBannerIcon,
      EmbedCardHorizontalIcon: EmbedCardDarkHorizontalIcon,
      EmbedCardListIcon: EmbedCardDarkListIcon,
      EmbedCardVerticalIcon: EmbedCardDarkVerticalIcon,
      EmbedCardCubeIcon: EmbedCardDarkCubeIcon,
    };
  }
}
