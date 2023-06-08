import type { NextApiRequest, NextApiResponse } from 'next'
import { sqlQuery } from '@lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{success: boolean; message?: string; data?: any}>) {
  try {
    let whereFields = {stmt: '', values: [] as any[]};

    // CREATE TYPE
    if (req.method === 'POST') {
      if (!req.body) res.status(401).json({success: false, message: 'Aucune donnée passée'});
        const body = JSON.parse(req.body);

        const sql = `INSERT INTO types SET ?`;  
        const results = await sqlQuery(sql, [body]);
      
        res.status(200).json({success: true, data: results});
    }
    // GET TYPES
    else if (req.method === 'GET') {
        const sql = `SELECT id, label FROM types`;  
        const results = await sqlQuery(sql, whereFields.values);
        
        res.status(200).json({success: true, data: results});
    }
  }
  catch(err: any) {
    res.status(500).json({ success: false, message: err });
  }
}