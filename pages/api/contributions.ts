import type { NextApiRequest, NextApiResponse } from 'next'
import { sqlQuery } from '@lib/db';

const contributionsFields = ['co_id', 'co_member', 'co_amount', 'co_bonus', 'co_date'];

export default async function handler(req: NextApiRequest, res: NextApiResponse<{success: boolean; message?: string; data?: any}>) {
  try {
    let whereFields = {stmt: '', values: [] as any[]};

    if (req.method === 'POST') {
      if (!req.body) res.status(401).json({success: false, message: 'Aucune donnée passée'});
        const body = JSON.parse(req.body);

        // GET AMOUNT BY ROLE
        const co_member = body.co_member;
        const amountSql = `SELECT ro_amount FROM roles JOIN members ON roles.ro_id = members.me_role WHERE me_id = ?`;
        const amountResults = await sqlQuery(amountSql, [co_member]);
        const amount = amountResults[0].ro_amount;
        body.co_amount = amount;

        const sql = `INSERT INTO contributions SET ?`;  
        const results = await sqlQuery(sql, [body]);
      
        res.status(200).json({success: true, data: results});
    }
    // GET USER
    else if (req.method === 'GET') {
        if (req.query?.co_date) {
            whereFields.stmt += 'WHERE co_date = ?';
            whereFields.values.push(req.query.co_date);
        }

        const sql = `SELECT ${contributionsFields.join(', ')} FROM contributions ${whereFields.stmt}`;  
        const results = await sqlQuery(sql, whereFields.values);
        
        res.status(200).json({success: true, data: results});
    }
  }
  catch(err: any) {
    res.status(500).json({ success: false, message: err });
  }
}