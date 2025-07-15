import { MIN_GAS_LIMIT_HEX } from '../../../../shared/constants/gas';
import { Numeric } from '../../../../shared/modules/Numeric';
import { EtherDenomination } from '../../../../shared/constants/common';

const MIN_GAS_PRICE_DEC = '0';
const MIN_GAS_PRICE_HEX = parseInt(MIN_GAS_PRICE_DEC, 10).toString(16);
const MIN_GAS_LIMIT_DEC = new Numeric('21000', 10);
const MAX_GAS_LIMIT_DEC = '3000000';

const HIGH_FEE_WARNING_MULTIPLIER = 1.5;
const MIN_GAS_PRICE_GBEI = new Numeric(
  MIN_GAS_PRICE_HEX,
  16,
  EtherDenomination.WEI,
)
.toDenomination(EtherDenomination.GWEI)
.round(1)
.toPrefixedHexString();

export {
    MAX_GAS_LIMIT_DEC,
    HIGH_FEE_WARNING_MULTIPLIER,
    INSUFFICIENT_FUNDS_ERROR: "insufficientFunds",
    INSUFFICIENT_FUNDS_FOR_GAS_ERROR: "insufficientFundsForGas",
    INSUFFICIENT_TOKENS_ERROR: "insufficientTokens",
    INVALID_RECIPIENT_ADDRESS_ERROR: "invalidAddressRecipient",
    KNOWN_RECIPIENT_ADDRESS_WARNING: "knownAddressRecipient",
    CONTRACT_ADDRESS_ERROR: "contractAddressError",
    ENS_UNKNOWN_ERROR: "ensUnknownError",
   NO_RESOLUTION_FOR_DOMAIN : 'noDomainResolution',
   FLOAT_TOKENS_ERROR :'floatAmountToken',
   REQUIRED_ERROR:'required',
   CONFUSING_ENS_error:'confusingEnsDomain',
   TOKEN_TRANSFER_FUNCTION_SIGNATURE:'a94d98ba7a2b5847b96f4e7f8af3a35c9bd8cf2e',
   NFT_TRANSFER_FROM_FUNCTION_SIGNATURE:'23b872ddccccccccccecceecfcacfeebbeecfffcbcdeefbeebeaecfeeeedcbbcdcefeebfdbeeaabcaababeabaeebcaabbcfcdfbdefdbfdbefeecddaddeabcdefbbdaaeedeeeeddfbedeeaeebbdebacdfbeccceedbfcbdedfdbdfdcbaadbadaccaddaaadcaccadeabedaddaaabbcdadebfdcfaefbbfaefeedfadecfbebeccaafdadfdaafbabacdaedaaffadaadaadaededaeadfceddcebadabeaaffdbdecaceadeedeabaefffadecedadeacaecdadaffdaceeaafffaaaacaafeaaacfeeffeafffabbeedeedeacebcddbabbeeagcefabcadeecebaabaceddeadfffabbcaddebbeddeseaaaadbbeeffbedfeffffff'
};
