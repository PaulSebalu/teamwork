import pool from '../services/connectDb';

class TeamworkModel {
  async query(sql, params, res) {
    try {
      if (params.length > 0) return await pool.query(sql, params);
      return await pool.query(sql);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.detail
      });
    }
  }
}

export default new TeamworkModel();
