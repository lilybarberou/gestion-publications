import type { NextApiRequest, NextApiResponse } from 'next'
import { sqlQuery } from '@lib/db';
import { User } from '@lib/types';

const userFields = ['me_id', 'me_role', 'me_email', 'me_firstname', 'me_name'];

export default async function handler(req: NextApiRequest, res: NextApiResponse<{success: boolean; message?: string; data?: User[]}>) {
  try {
    let whereFields = {stmt: '', values: [] as any[]};

    // GET USER
    if (req.method === 'GET') {
      if (req.query?.id) {
        whereFields.stmt += ' AND id = ?';
        whereFields.values.push(req.query.me_id);
      }

      const sql = `SELECT ${userFields.join(', ')} FROM members ${whereFields.stmt}`;  
      const results: User[] = await sqlQuery(sql, whereFields.values);
      
      res.status(200).json({success: true, data: results});
    }
    else if (req.method === 'DELETE') {
      if (!req.body) return res.status(401).json({success: false, message: 'Aucune donnée passée'});
      if (req.body) {
        const body = JSON.parse(req.body);
        if (body?.me_id) {
          whereFields.stmt += 'me_id = ?';
          whereFields.values.push(body.me_id);
        }
      }
      
      const sql = `DELETE FROM members ${whereFields.stmt ? 'WHERE ' + whereFields.stmt : ''}`;  
      await sqlQuery(sql, whereFields.values);
      
      res.status(200).json({success: true});
    }
  }
  catch(err: any) {
    res.status(500).json({ success: false, message: err });
  }
}