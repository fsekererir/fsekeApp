import {
  TRIGGER_TYPES,
  type ExpandedView,
} from '@fsekeapp/notification-services-controller/notification-services';
import { ExtractedNotification } from '../node-guard';

export type SnapNotification = ExtractedNotification<TRIGGER_TYPES.SNAP>;

export type DetailedViewData = SnapNotification['data'] & { origin: string; message: string; detailedView: ExpandedView };
