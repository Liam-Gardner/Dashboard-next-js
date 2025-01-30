import { BusinessData } from '@/pages/api/business';

export const getBusinessDataKey = 'getBusinessData';
export const getBusinessData = async () => {
  try {
    const response = await fetch(`/api/business`);

    if (!response.ok) {
      throw new Error('Failed to fetch business data');
    }
    const data = (await response.json()) as BusinessData;
    return data;
  } catch (error) {
    // TODO: log error
    throw error;
  }
};
