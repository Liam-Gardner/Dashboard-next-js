import type { NextApiRequest, NextApiResponse } from 'next';

export type BusinessData = {
  businessName: string;
  totalCustomers: number;
  pointsIssued: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BusinessData | { error: string }>
) {
  try {
    const data = await getBusinessData();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to load data' });
  }
}

const getBusinessData = async () => {
  return {
    businessName: 'Yellow Door Coffee',
    totalCustomers: 120,
    pointsIssued: 34500,
  };
};
