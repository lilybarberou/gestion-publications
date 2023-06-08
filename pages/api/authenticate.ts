import type { NextApiRequest, NextApiResponse } from 'next'
import { sqlQuery } from '@lib/db'
import jwt from 'jsonwebtoken';
import { User } from '@lib/types';

type Response = {
  success: boolean;
  message?: string;
  access_token?: string;
  data?: User
}

type Token = {
    id: number;
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const access_token = req.body;
    const decoded = jwt.verify(access_token, process.env.JWT) as Token;
    
    const sql = `SELECT id, name, firstname, domain FROM users WHERE id = ? AND email = ?`;
    const result = await sqlQuery(sql, [decoded.id, decoded.email]);
    
    if (result.length === 0) throw { message: 'Token invalide'};
    res.status(200).json({success: true, data: result[0]});  
  }
  catch(err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
}