// TODO: This is a mock config. Fix createConfig on utils to remove this. relaysList not working properly

import relaysList from './relays.json';

export const mockConfig = {
  federationId: 'lawallet.ar',
  endpoints: {
    gateway: 'https://api.lawallet.ar',
    lightningDomain: 'https://lawallet.ar',
  },
  relaysList,
  modulePubkeys: {
    card: '18f6a706091b421bd9db1ec964b4f934007fb6997c60e3c500fdaebe5f9f7b18',
    ledger: 'bd9b0b60d5cd2a9df282fc504e88334995e6fac8b148fa89e0f8c09e2a570a84',
    urlx: 'e17feb5f2cf83546bcf7fd9c8237b05275be958bd521543c2285ffc6c2d654b3',
  },
  storage: {
    'ally-supports-cache':
      '{"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","version":"1.4.1","focusAreaImgTabindex":false,"focusAreaTabindex":false,"focusAreaWithoutHref":false,"focusAudioWithoutControls":false,"focusBrokenImageMap":true,"focusChildrenOfFocusableFlexbox":false,"focusFieldsetDisabled":true,"focusFieldset":false,"focusFlexboxContainer":false,"focusFormDisabled":true,"focusImgIsmap":false,"focusImgUsemapTabindex":true,"focusInHiddenIframe":true,"focusInvalidTabindex":false,"focusLabelTabindex":true,"focusObjectSvg":true,"focusObjectSvgHidden":false,"focusRedirectImgUsemap":false,"focusRedirectLegend":"","focusScrollBody":false,"focusScrollContainerWithoutOverflow":false,"focusScrollContainer":false,"focusSummary":true,"focusSvgFocusableAttribute":false,"focusSvgTabindexAttribute":true,"focusSvgNegativeTabindexAttribute":true,"focusSvgUseTabindex":true,"focusSvgForeignobjectTabindex":true,"focusSvg":false,"focusTabindexTrailingCharacters":true,"focusTable":false,"focusVideoWithoutControls":false,"cssShadowPiercingDeepCombinator":"","focusInZeroDimensionObject":true,"focusObjectSwf":true,"focusSvgInIframe":false,"tabsequenceAreaAtImgPosition":false,"time":"2024-03-29T06:02:23.981Z"}',
    prices: '{"ARS":0.7165195065000001,"USD":0.0007003391,"SAT":1,"lastUpdated":1711815132317}',
  },
};
