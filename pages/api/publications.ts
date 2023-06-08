import type { NextApiRequest, NextApiResponse } from 'next'
import { sqlQuery } from '@lib/db';

const publicationsFields = ['publications.id', 'title', 'authors', 'date_published', 'link', 'review', 'conference', 'book', 'volume', 'number', 'pages', 'editor', 'type_id', 'users.firstname', 'users.name'];

export default async function handler(req: NextApiRequest, res: NextApiResponse<{success: boolean; message?: string; data?: any}>) {
  try {
    let whereFields = {stmt: '', values: [] as any[]};

    if (req.method === 'POST') {
      if (!req.body) res.status(401).json({success: false, message: 'Aucune donnée passée'});
        const body = JSON.parse(req.body);

        const sql = `INSERT INTO publications SET ?`;  
        const results = await sqlQuery(sql, [body]);
      
        res.status(200).json({success: true, data: results});
    }
    // GET PUBLICATIONS
    else if (req.method === 'GET') {
        const sql = `SELECT ${publicationsFields.join(', ')} FROM publications JOIN users ON publications.user_id = users.id ${whereFields.stmt}`;  
        const results = await sqlQuery(sql, whereFields.values);
        
        res.status(200).json({success: true, data: results});
    }
  }
  catch(err: any) {
    res.status(500).json({ success: false, message: err });
  }
}