import { AccountInfoType } from '@/types/accountType.type';
import { Invitation } from '@/types/database.type';
import {
  ColorType,
  DecorateImageType,
  GreetingMessageType,
  ImageRatioType,
  InvitationFormType,
  MainPhotoType,
  MoodPresetType,
  NavigationDetailType,
  PersonalInfoType,
  StickerType,
  WeddingInfoType,
  GalleryType,
  OrderItem,
  InvitationFetchType,
  FontInfoType,
} from '@/types/invitationFormType.type';

export const convertToCamelCase = (invitation: Invitation): InvitationFetchType => {
  return {
    gallery: invitation.gallery as GalleryType,
    type: invitation.type as 'scroll' | 'slide',
    moodPreset: invitation.mood_preset as MoodPresetType,
    mainView: invitation.main_view as DecorateImageType,
    bgColor: invitation.bg_color as ColorType,
    stickers: invitation.stickers as StickerType[],
    imgRatio: invitation.img_ratio as ImageRatioType,
    mainText: invitation.main_text as string,
    greetingMessage: invitation.greeting_message as GreetingMessageType,
    guestbook: invitation.guestbook as boolean,
    attendance: invitation.attendance as boolean,
    personalInfo: invitation.personal_info as PersonalInfoType,
    weddingInfo: invitation.wedding_info as WeddingInfoType,
    account: invitation.account as AccountInfoType,
    navigationDetail: invitation.navigation_detail as NavigationDetailType,
    dDay: invitation.d_day as boolean,
    mainPhotoInfo: invitation.main_photo_info as MainPhotoType,
    isPrivate: invitation.isPrivate as boolean,
    renderOrder: invitation.render_order as OrderItem[],
    userId: invitation.user_id as string,
    fontInfo: invitation.font_info as FontInfoType,
  };
};

export const convertToSnakeCase = (invitation: InvitationFormType) => {
  return {
    gallery: invitation.gallery,
    type: invitation.type,
    mood_preset: invitation.moodPreset,
    main_view: invitation.mainView,
    bg_color: invitation.bgColor,
    stickers: invitation.stickers,
    img_ratio: invitation.imgRatio,
    main_text: invitation.mainText,
    greeting_message: invitation.greetingMessage,
    guestbook: invitation.guestbook as boolean,
    attendance: invitation.attendance as boolean,
    personal_info: invitation.personalInfo as PersonalInfoType,
    wedding_info: invitation.weddingInfo as WeddingInfoType,
    account: invitation.account as AccountInfoType,
    navigation_detail: invitation.navigationDetail as NavigationDetailType,
    d_day: invitation.dDay as boolean,
    main_photo_info: invitation.mainPhotoInfo as MainPhotoType,
    isPrivate: invitation.isPrivate as boolean,
    render_order: invitation.renderOrder as OrderItem[],
    font_info: invitation.fontInfo,
  };
};
