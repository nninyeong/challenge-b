import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import browserClient from './supabase/client';
import { isEqual } from 'lodash';

function deepSort(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(deepSort);
  }

  if (value && typeof value === 'object' && value.constructor === Object) {
    const sortedObj: Record<string, unknown> = {};
    Object.keys(value)
      .sort()
      .forEach((key) => {
        sortedObj[key] = deepSort((value as Record<string, unknown>)[key]);
      });
    return sortedObj;
  }

  return value;
}

function deepEquals(target1: unknown, target2: unknown): boolean {
  if (target1 === undefined) {
    return true;
  }

  const sortedTarget1 = deepSort(target1);
  const sortedTarget2 = deepSort(target2);

  return isEqual(sortedTarget1, sortedTarget2);
}

export const fetchInvitationFields = async (id: string) => {
  const { data } = await browserClient
    .from('invitation')
    .select('*')
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .limit(1);

  return data?.[0];
};

const calculateProgress = (supabaseData: Record<string, unknown>, defaultValue: Record<string, unknown>): number => {
  let completedFields = 0;

  const fieldsToCheck = [
    'personalInfo',
    'account',
    'weddingInfo',
    'mainPhotoInfo',
    'navigationDetail',
    'gallery',
    'greetingMessage',
    'fontInfo',
  ];

  for (const field of fieldsToCheck) {
    const fieldData = supabaseData?.[field];
    const defaultFieldData = defaultValue?.[field];

    if (deepEquals(fieldData, defaultFieldData)) {
    } else {
      completedFields += 1;
    }
  }

  const totalFields = fieldsToCheck.length;

  const progressPercentage = Math.min(Math.floor((completedFields / totalFields) * 8) * 12.5, 100);

  return progressPercentage;
};

export const calculateProgressPercentage = async (id: string): Promise<number> => {
  const supabaseData = await fetchInvitationFields(id);
  if (!supabaseData) {
    return 0;
  }
  return calculateProgress(supabaseData, INVITATION_DEFAULT_VALUE);
};
